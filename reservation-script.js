// Session management
class SessionManager {
    static getCurrentUser() {
        const session = localStorage.getItem('userSession') || sessionStorage.getItem('userSession');
        return session ? JSON.parse(session) : null;
    }

    static isLoggedIn() {
        return this.getCurrentUser() !== null;
    }
}

// Variable globale pour le restaurant
let restaurant = null;

// Récupérer l'ID du restaurant depuis l'URL
const urlParams = new URLSearchParams(window.location.search);
const restaurantId = parseInt(urlParams.get('id'));

// Charger le restaurant depuis l'API
async function loadRestaurant() {
    try {
        restaurant = await apiRequest(`${API_CONFIG.ENDPOINTS.RESTAURANTS}/${restaurantId}`);

        // Afficher les informations du restaurant
        document.getElementById('restaurant-name').textContent = restaurant.name;
        document.getElementById('restaurant-address').textContent = '📍 ' + restaurant.address;
        document.getElementById('restaurant-type').textContent = restaurant.type;
    } catch (error) {
        console.error('Erreur chargement restaurant:', error);
        alert('Restaurant introuvable');
        window.location.href = 'index.html';
    }
}

// Définir la date minimale à aujourd'hui
const today = new Date().toISOString().split('T')[0];
document.getElementById('reservation-date').setAttribute('min', today);

// Pré-remplir les informations de l'utilisateur s'il est connecté
const currentUser = SessionManager.getCurrentUser();
if (currentUser) {
    document.getElementById('guest-name').value = currentUser.userName;
    document.getElementById('guest-email').value = currentUser.userEmail;
}

// Mise à jour du récapitulatif en temps réel
function updateSummary() {
    if (!restaurant) return;

    const serviceType = document.querySelector('input[name="service-type"]:checked');
    const date = document.getElementById('reservation-date').value;
    const time = document.getElementById('reservation-time').value;
    const guests = document.getElementById('num-guests').value;
    const name = document.getElementById('guest-name').value;

    if (serviceType && date && time && guests && name) {
        const dateObj = new Date(date);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = dateObj.toLocaleDateString('fr-FR', options);

        const serviceTypeText = serviceType.value === 'takeaway'
            ? '🥡 À emporter (Ailleurs que là-bas)'
            : '🪑 Sur place (Ici pas sur place)';

        const summaryHTML = `
            <p><strong>Restaurant :</strong> ${restaurant.name}</p>
            <p><strong>Type de service :</strong> ${serviceTypeText}</p>
            <p><strong>Date :</strong> ${formattedDate}</p>
            <p><strong>Heure :</strong> ${time}</p>
            <p><strong>Nombre de personnes :</strong> ${guests}</p>
            <p><strong>Nom :</strong> ${name}</p>
        `;
        document.getElementById('summary-content').innerHTML = summaryHTML;
    }
}

// Écouter les changements sur les champs du formulaire
document.querySelectorAll('input[name="service-type"]').forEach(radio => {
    radio.addEventListener('change', updateSummary);
});
document.getElementById('reservation-date').addEventListener('change', updateSummary);
document.getElementById('reservation-time').addEventListener('change', updateSummary);
document.getElementById('num-guests').addEventListener('change', updateSummary);
document.getElementById('guest-name').addEventListener('input', updateSummary);

// Gestion de la soumission du formulaire
document.getElementById('reservation-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Vérifier si l'utilisateur est connecté
    if (!SessionManager.isLoggedIn()) {
        const confirmLogin = confirm('Vous devez être connecté pour réserver. Voulez-vous vous connecter maintenant ?');
        if (confirmLogin) {
            sessionStorage.setItem('redirectAfterLogin', window.location.href);
            window.location.href = 'auth.html';
        }
        return;
    }

    // Récupérer les données du formulaire
    const serviceTypeElement = document.querySelector('input[name="service-type"]:checked');
    const serviceType = serviceTypeElement ? serviceTypeElement.value : null;
    const date = document.getElementById('reservation-date').value;
    const time = document.getElementById('reservation-time').value;
    const guests = document.getElementById('num-guests').value;
    const name = document.getElementById('guest-name').value;
    const phone = document.getElementById('guest-phone').value;
    const email = document.getElementById('guest-email').value;
    const specialRequests = document.getElementById('special-requests').value;

    // Validation
    if (!serviceType) {
        showMessage('Veuillez choisir un type de service (À emporter ou Sur place)', 'error');
        return;
    }

    if (!date || !time || !guests || !name || !phone || !email) {
        showMessage('Veuillez remplir tous les champs obligatoires', 'error');
        return;
    }

    // Mapper le type de service au format API
    const apiServiceType = serviceType === 'takeaway' ? 'a_emporter' : 'sur_place';

    try {
        // Créer la réservation via l'API
        const response = await apiRequest(API_CONFIG.ENDPOINTS.RESERVATIONS, {
            method: 'POST',
            body: {
                userId: currentUser.userId,
                restaurantId: restaurant.id,
                date,
                time,
                guests: parseInt(guests),
                serviceType: apiServiceType,
                specialRequests: specialRequests || ''
            }
        });

        // Afficher un message de succès
        showMessage(
            `Réservation enregistrée ! Votre demande de réservation pour ${guests} personne(s) le ${date} à ${time} a bien été envoyée. Le restaurant va la traiter sous peu.`,
            'success'
        );

        // Rediriger après 3 secondes
        setTimeout(() => {
            window.location.href = 'my-reservations.html';
        }, 3000);
    } catch (error) {
        showMessage('Erreur lors de la création de la réservation: ' + error.message, 'error');
    }
});

// Fonction pour afficher les messages
function showMessage(message, type) {
    const oldMessages = document.querySelectorAll('.success-message, .error-message');
    oldMessages.forEach(msg => msg.remove());

    const messageDiv = document.createElement('div');
    messageDiv.className = type === 'success' ? 'success-message' : 'error-message';
    messageDiv.textContent = message;

    const form = document.getElementById('reservation-form');
    const content = document.querySelector('.reservation-content');
    content.insertBefore(messageDiv, form);

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Initialiser au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    loadRestaurant();
});
