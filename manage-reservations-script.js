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

// Variables globales
let allReservations = [];
let currentFilter = 'all';
let restaurant = null;

// Charger les informations du restaurant
async function loadRestaurant() {
    try {
        restaurant = await apiRequest(`${API_CONFIG.ENDPOINTS.RESTAURANTS}/${currentUser.restaurantId}`);
        document.getElementById('restaurant-name-header').textContent = restaurant.name;
    } catch (error) {
        console.error('Erreur chargement restaurant:', error);
    }
}

// Charger les réservations du restaurant
async function loadReservations() {
    try {
        allReservations = await apiRequest(`${API_CONFIG.ENDPOINTS.RESERVATIONS}/restaurant/${currentUser.restaurantId}`);
        displayReservations();
    } catch (error) {
        console.error('Erreur chargement réservations:', error);
        alert('Impossible de charger les réservations');
    }
}

// Fonction pour mettre à jour les statistiques
function updateStats() {
    const pending = allReservations.filter(r => r.status === 'pending').length;
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

    // Mapper le type de service
    const serviceTypeText = reservation.service_type === 'a_emporter'
        ? '🥡 À emporter (Ailleurs que là-bas)'
        : '🪑 Sur place (Ici pas sur place)';
    const serviceIcon = reservation.service_type === 'a_emporter' ? '🥡' : '🪑';

    card.innerHTML = `
        <div class="reservation-header">
            <div>
                <h3>Réservation #${reservation.id}</h3>
                <p style="color: #666; margin-top: 0.3rem;">Créée le ${new Date(reservation.created_at).toLocaleString('fr-FR')}</p>
            </div>
            <span class="reservation-status ${statusClass}">${statusText}</span>
        </div>

        <div class="reservation-details">
            <div class="detail-item" style="grid-column: 1 / -1;">
                <span class="detail-icon">${serviceIcon}</span>
                <span><strong>Type :</strong> ${serviceTypeText}</span>
            </div>
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
                <span><strong>Nom :</strong> ${reservation.user_name}</span>
            </div>
        </div>

        <div class="reservation-info">
            <p><strong>✉️ Email :</strong> ${reservation.user_email}</p>
        </div>

        ${reservation.special_requests ? `
            <div class="special-requests">
                <p><strong>💬 Demandes spéciales :</strong> ${reservation.special_requests}</p>
            </div>
        ` : ''}

        <div class="reservation-actions">
            ${reservation.status === 'pending' ? `
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
            ${reservation.status === 'confirmed' ? `
                <p style="color: #2e7d32; font-style: italic;">Cette réservation a été acceptée</p>
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
async function acceptReservation(reservationId) {
    const confirmed = confirm('Voulez-vous accepter cette réservation ?');

    if (confirmed) {
        try {
            await apiRequest(`${API_CONFIG.ENDPOINTS.RESERVATIONS}/${reservationId}/status`, {
                method: 'PUT',
                body: { status: 'confirmed' }
            });

            alert('Réservation acceptée !');
            await loadReservations();
        } catch (error) {
            alert('Erreur lors de l\'acceptation de la réservation: ' + error.message);
        }
    }
}

// Refuser une réservation
async function refuseReservation(reservationId) {
    const confirmed = confirm('Voulez-vous refuser cette réservation ?');

    if (confirmed) {
        try {
            await apiRequest(`${API_CONFIG.ENDPOINTS.RESERVATIONS}/${reservationId}/status`, {
                method: 'PUT',
                body: { status: 'refused' }
            });

            alert('Réservation refusée');
            await loadReservations();
        } catch (error) {
            alert('Erreur lors du refus de la réservation: ' + error.message);
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

// Initialiser au chargement de la page
document.addEventListener('DOMContentLoaded', async () => {
    await loadRestaurant();
    await loadReservations();
});
