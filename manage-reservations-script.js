// Données des restaurants
const restaurants = [
    { id: 1, name: "West Africa" },
    { id: 2, name: "Rochangul" },
    { id: 3, name: "Le Pharaon" },
    { id: 4, name: "Sartaj" },
    { id: 5, name: "Shalimar" },
    { id: 6, name: "Chez Ali" },
    { id: 7, name: "Mon Poulet Braisé" },
    { id: 8, name: "Hollywood Canteen" },
    { id: 9, name: "A La Braise By Abou" },
    { id: 10, name: "Table du Garçon Boucher" },
    { id: 11, name: "BChef Dijon" },
    { id: 12, name: "Babou" },
    { id: 13, name: "Lycée Kebab" },
    { id: 14, name: "Eden Kebab" },
    { id: 15, name: "O'Crousti Poulet" },
    { id: 16, name: "GOWOK" },
    { id: 17, name: "Chamas Tacos" },
    { id: 18, name: "Pizza's Smile" },
    { id: 19, name: "Alforno Pizza" },
    { id: 20, name: "O'Tacos" }
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

    static getRestaurantReservations(restaurantId) {
        const reservations = this.getAllReservations();
        return reservations.filter(res => res.restaurantId === restaurantId);
    }

    static updateReservationStatus(reservationId, status) {
        const reservations = this.getAllReservations();
        const index = reservations.findIndex(r => r.id === reservationId);
        if (index !== -1) {
            reservations[index].status = status;
            reservations[index].statusUpdatedAt = new Date().toISOString();
            localStorage.setItem('reservations', JSON.stringify(reservations));
            return true;
        }
        return false;
    }
}

// Vérifier si l'utilisateur est connecté et est un restaurant
const currentUser = SessionManager.getCurrentUser();
if (!currentUser) {
    alert('Veuillez vous connecter pour accéder à cette page');
    window.location.href = 'auth.html';
}

if (currentUser.userRole !== 'restaurant') {
    alert('Cette page est réservée aux restaurants');
    window.location.href = 'index.html';
}

if (!currentUser.restaurantId) {
    alert('Aucun restaurant associé à votre compte');
    window.location.href = 'index.html';
}

// Récupérer les informations du restaurant
const restaurant = restaurants.find(r => r.id === currentUser.restaurantId);
if (restaurant) {
    document.getElementById('restaurant-name-header').textContent = restaurant.name;
}

// Récupérer les réservations du restaurant
let allReservations = ReservationManager.getRestaurantReservations(currentUser.restaurantId);
let currentFilter = 'all';

// Fonction pour mettre à jour les statistiques
function updateStats() {
    const pending = allReservations.filter(r => r.status === 'pending' || r.status === 'confirmed').length;
    const confirmed = allReservations.filter(r => r.status === 'confirmed').length;
    const refused = allReservations.filter(r => r.status === 'refused').length;
    const total = allReservations.length;

    document.getElementById('pending-count').textContent = pending;
    document.getElementById('confirmed-count').textContent = confirmed;
    document.getElementById('refused-count').textContent = refused;
    document.getElementById('total-count').textContent = total;
}

// Fonction pour créer une carte de réservation
function createReservationCard(reservation) {
    const card = document.createElement('div');
    card.className = `reservation-card ${reservation.status}`;
    card.dataset.status = reservation.status;

    const dateObj = new Date(reservation.date);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = dateObj.toLocaleDateString('fr-FR', options);

    let statusClass = 'status-confirmed';
    let statusText = 'Confirmée';

    if (reservation.status === 'pending') {
        statusClass = 'status-pending';
        statusText = 'En attente';
    } else if (reservation.status === 'refused') {
        statusClass = 'status-refused';
        statusText = 'Refusée';
    }

    card.innerHTML = `
        <div class="reservation-header">
            <div>
                <h3>Réservation #${reservation.id}</h3>
                <p style="color: #666; margin-top: 0.3rem;">Créée le ${new Date(reservation.createdAt).toLocaleString('fr-FR')}</p>
            </div>
            <span class="reservation-status ${statusClass}">${statusText}</span>
        </div>

        <div class="reservation-details">
            ${reservation.serviceTypeText ? `
                <div class="detail-item" style="grid-column: 1 / -1;">
                    <span class="detail-icon">${reservation.serviceType === 'takeaway' ? '🥡' : '🪑'}</span>
                    <span><strong>Type :</strong> ${reservation.serviceTypeText}</span>
                </div>
            ` : ''}
            <div class="detail-item">
                <span class="detail-icon">📅</span>
                <span><strong>Date :</strong> ${formattedDate}</span>
            </div>
            <div class="detail-item">
                <span class="detail-icon">🕐</span>
                <span><strong>Heure :</strong> ${reservation.time}</span>
            </div>
            <div class="detail-item">
                <span class="detail-icon">👥</span>
                <span><strong>Personnes :</strong> ${reservation.guests}</span>
            </div>
            <div class="detail-item">
                <span class="detail-icon">👤</span>
                <span><strong>Nom :</strong> ${reservation.guestName}</span>
            </div>
        </div>

        <div class="reservation-info">
            <p><strong>📞 Téléphone :</strong> ${reservation.guestPhone}</p>
            <p><strong>✉️ Email :</strong> ${reservation.guestEmail}</p>
        </div>

        ${reservation.specialRequests ? `
            <div class="special-requests">
                <p><strong>💬 Demandes spéciales :</strong> ${reservation.specialRequests}</p>
            </div>
        ` : ''}

        <div class="reservation-actions">
            ${reservation.status === 'pending' || reservation.status === 'confirmed' ? `
                <button class="action-btn btn-accept" onclick="acceptReservation(${reservation.id})">
                    ✅ Accepter
                </button>
                <button class="action-btn btn-refuse" onclick="refuseReservation(${reservation.id})">
                    ❌ Refuser
                </button>
            ` : ''}
            ${reservation.status === 'refused' ? `
                <p style="color: #c62828; font-style: italic;">Cette réservation a été refusée</p>
            ` : ''}
        </div>
    `;

    return card;
}

// Fonction pour afficher les réservations
function displayReservations() {
    const container = document.getElementById('reservations-list');
    container.innerHTML = '';

    let filteredReservations = allReservations;

    // Appliquer le filtre
    if (currentFilter !== 'all') {
        filteredReservations = allReservations.filter(r => r.status === currentFilter);
    }

    // Trier par date (plus récentes en premier)
    filteredReservations.sort((a, b) => new Date(b.date) - new Date(a.date));

    if (filteredReservations.length === 0) {
        container.innerHTML = '<p class="empty-message">Aucune réservation pour ce filtre</p>';
    } else {
        filteredReservations.forEach(reservation => {
            container.appendChild(createReservationCard(reservation));
        });
    }

    updateStats();
}

// Accepter une réservation
function acceptReservation(reservationId) {
    const confirmed = confirm('Voulez-vous accepter cette réservation ?');

    if (confirmed) {
        const success = ReservationManager.updateReservationStatus(reservationId, 'confirmed');

        if (success) {
            alert('Réservation acceptée !');
            allReservations = ReservationManager.getRestaurantReservations(currentUser.restaurantId);
            displayReservations();
        } else {
            alert('Erreur lors de l\'acceptation de la réservation');
        }
    }
}

// Refuser une réservation
function refuseReservation(reservationId) {
    const confirmed = confirm('Voulez-vous refuser cette réservation ?');

    if (confirmed) {
        const success = ReservationManager.updateReservationStatus(reservationId, 'refused');

        if (success) {
            alert('Réservation refusée');
            allReservations = ReservationManager.getRestaurantReservations(currentUser.restaurantId);
            displayReservations();
        } else {
            alert('Erreur lors du refus de la réservation');
        }
    }
}

// Gestion des filtres
const filterButtons = document.querySelectorAll('.filter-btn');
filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Retirer la classe active de tous les boutons
        filterButtons.forEach(b => b.classList.remove('active'));

        // Ajouter la classe active au bouton cliqué
        btn.classList.add('active');

        // Mettre à jour le filtre actuel
        currentFilter = btn.dataset.filter;

        // Afficher les réservations filtrées
        displayReservations();
    });
});

// Affichage initial
displayReservations();
