// Données des restaurants (copié depuis script.js)
const restaurants = [
    { id: 1, name: "West Africa", address: "64 Rue d'Auxonne, 21000 Dijon", type: "Africaine", lat: 47.3145, lng: 5.0485, phone: "03 80 XX XX XX" },
    { id: 2, name: "Rochangul", address: "86 Rue Godrans, 21000 Dijon", type: "Ouïghour", lat: 47.3215, lng: 5.0405, phone: "03 80 XX XX XX" },
    { id: 3, name: "Le Pharaon", address: "116 Rue Berbisey, 21000 Dijon", type: "Libanaise", lat: 47.3185, lng: 5.0445, phone: "03 80 XX XX XX" },
    { id: 4, name: "Sartaj", address: "42 Rue Berbisey, 21000 Dijon", type: "Indienne", lat: 47.3195, lng: 5.0425, phone: "03 80 XX XX XX" },
    { id: 5, name: "Shalimar", address: "17 Rue de la Poste, 21000 Dijon", type: "Indienne/Pakistanaise", lat: 47.3225, lng: 5.0395, phone: "03 80 XX XX XX" },
    { id: 6, name: "Chez Ali", address: "24 Rue de la Chouette, 21000 Dijon", type: "Maghrébine", lat: 47.3210, lng: 5.0415, phone: "03 80 XX XX XX" },
    { id: 7, name: "Mon Poulet Braisé", address: "8 Boulevard de l'Europe, 21800 Quetigny", type: "Grillades", lat: 47.3115, lng: 5.0985, phone: "03 80 XX XX XX" },
    { id: 8, name: "Hollywood Canteen", address: "77 Rue en Paillery, 21850 Saint-Apollinaire", type: "Grillades", lat: 47.3415, lng: 5.0685, phone: "03 80 XX XX XX" },
    { id: 9, name: "A La Braise By Abou", address: "35 Rue de Longvic, 21300 Chenôve", type: "Poulet Braisé", lat: 47.2935, lng: 5.0215, phone: "03 80 XX XX XX" },
    { id: 10, name: "Table du Garçon Boucher", address: "132 Avenue Roland Carraz, 21300 Chenôve", type: "Boucherie-Restaurant", lat: 47.2885, lng: 5.0145, phone: "03 80 XX XX XX" },
    { id: 11, name: "BChef Dijon", address: "Rue des Godrans, 21000 Dijon", type: "Burgers", lat: 47.3220, lng: 5.0400, phone: "03 80 XX XX XX" },
    { id: 12, name: "Babou", address: "59 Rue Jeannin, 21000 Dijon", type: "Burgers Gourmets", lat: 47.3235, lng: 5.0385, phone: "03 80 XX XX XX" },
    { id: 13, name: "Lycée Kebab", address: "18 Boulevard Thiers, 21000 Dijon", type: "Kebab", lat: 47.3165, lng: 5.0365, phone: "03 80 XX XX XX" },
    { id: 14, name: "Eden Kebab", address: "21 Rue de la Préfecture, 21000 Dijon", type: "Kebab", lat: 47.3205, lng: 5.0425, phone: "03 80 XX XX XX" },
    { id: 15, name: "O'Crousti Poulet", address: "12 Boulevard des Martyrs de la Résistance, 21000 Dijon", type: "Poulet Frit", lat: 47.3155, lng: 5.0355, phone: "03 80 XX XX XX" },
    { id: 16, name: "GOWOK", address: "124 Rue d'Auxonne, 21000 Dijon", type: "Wok", lat: 47.3135, lng: 5.0505, phone: "03 80 XX XX XX" },
    { id: 17, name: "Chamas Tacos", address: "7 Avenue Garibaldi, 21000 Dijon", type: "Tacos", lat: 47.3175, lng: 5.0345, phone: "03 80 XX XX XX" },
    { id: 18, name: "Pizza's Smile", address: "109 Avenue Jean Jaurès, 21000 Dijon", type: "Pizza", lat: 47.3185, lng: 5.0325, phone: "03 80 XX XX XX" },
    { id: 19, name: "Alforno Pizza", address: "6 Rue Condorcet, 21000 Dijon", type: "Pizza", lat: 47.3265, lng: 5.0455, phone: "03 80 XX XX XX" },
    { id: 20, name: "O'Tacos", address: "114 Rue de Mirande, 21000 Dijon", type: "Tacos", lat: 47.3315, lng: 5.0565, phone: "03 80 XX XX XX" }
];

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

// Gestion des réservations
class ReservationManager {
    static getAllReservations() {
        return JSON.parse(localStorage.getItem('reservations') || '[]');
    }

    static addReservation(reservation) {
        const reservations = this.getAllReservations();
        const newReservation = {
            id: Date.now(),
            ...reservation,
            createdAt: new Date().toISOString()
        };
        reservations.push(newReservation);
        localStorage.setItem('reservations', JSON.stringify(reservations));
        return newReservation;
    }

    static getUserReservations(userId) {
        const reservations = this.getAllReservations();
        return reservations.filter(res => res.userId === userId);
    }
}

// Récupérer l'ID du restaurant depuis l'URL
const urlParams = new URLSearchParams(window.location.search);
const restaurantId = parseInt(urlParams.get('id'));

// Trouver le restaurant
const restaurant = restaurants.find(r => r.id === restaurantId);

if (!restaurant) {
    alert('Restaurant introuvable');
    window.location.href = 'index.html';
} else {
    // Afficher les informations du restaurant
    document.getElementById('restaurant-name').textContent = restaurant.name;
    document.getElementById('restaurant-address').textContent = '📍 ' + restaurant.address;
    document.getElementById('restaurant-type').textContent = restaurant.type;
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
document.getElementById('reservation-form').addEventListener('submit', (e) => {
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

    // Créer la réservation
    const serviceTypeText = serviceType === 'takeaway'
        ? 'À emporter (Ailleurs que là-bas)'
        : 'Sur place (Ici pas sur place)';

    const reservation = {
        userId: currentUser.userId,
        restaurantId: restaurant.id,
        restaurantName: restaurant.name,
        restaurantAddress: restaurant.address,
        serviceType: serviceType,
        serviceTypeText: serviceTypeText,
        date,
        time,
        guests,
        guestName: name,
        guestPhone: phone,
        guestEmail: email,
        specialRequests,
        status: 'confirmed'
    };

    // Sauvegarder la réservation
    const savedReservation = ReservationManager.addReservation(reservation);

    // Afficher un message de succès
    showMessage(
        `Réservation confirmée ! Votre réservation pour ${guests} personne(s) le ${date} à ${time} a bien été enregistrée.`,
        'success'
    );

    // Rediriger après 3 secondes
    setTimeout(() => {
        window.location.href = 'my-reservations.html';
    }, 3000);
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
