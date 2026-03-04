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

// Vérifier si l'utilisateur est connecté
const currentUser = SessionManager.getCurrentUser();
if (!currentUser) {
    alert('Veuillez vous connecter pour voir vos réservations');
    window.location.href = 'auth.html';
}

// Charger les réservations depuis l'API
async function loadReservations() {
    try {
        const reservations = await apiRequest(`${API_CONFIG.ENDPOINTS.RESERVATIONS}/user/${currentUser.userId}`);

        // Séparer les réservations à venir et passées
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const upcomingReservations = reservations.filter(res => {
            const resDate = new Date(res.date);
            return resDate >= today && res.status !== 'cancelled';
        }).sort((a, b) => new Date(a.date) - new Date(b.date));

        const pastReservations = reservations.filter(res => {
            const resDate = new Date(res.date);
            return resDate < today || res.status === 'cancelled';
        }).sort((a, b) => new Date(b.date) - new Date(a.date));

        // Mettre à jour les compteurs
        document.getElementById('upcoming-count').textContent = upcomingReservations.length;
        document.getElementById('past-count').textContent = pastReservations.length;

        // Afficher les réservations à venir
        const upcomingContainer = document.getElementById('upcoming-reservations');
        if (upcomingReservations.length === 0) {
            upcomingContainer.innerHTML = '<p class="empty-message">Aucune réservation à venir</p>';
        } else {
            upcomingContainer.innerHTML = '';
            upcomingReservations.forEach(reservation => {
                upcomingContainer.appendChild(createReservationCard(reservation, false));
            });
        }

        // Afficher les réservations passées
        const pastContainer = document.getElementById('past-reservations');
        if (pastReservations.length === 0) {
            pastContainer.innerHTML = '<p class="empty-message">Aucune réservation passée</p>';
        } else {
            pastContainer.innerHTML = '';
            pastReservations.forEach(reservation => {
                pastContainer.appendChild(createReservationCard(reservation, true));
            });
        }
    } catch (error) {
        console.error('Erreur lors du chargement des réservations:', error);
        alert('Impossible de charger les réservations');
    }
}

// Créer une carte de réservation
function createReservationCard(reservation, isPast) {
    const card = document.createElement('div');
    card.className = `reservation-card ${isPast ? 'past' : ''}`;

    const dateObj = new Date(reservation.date);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = dateObj.toLocaleDateString('fr-FR', options);

    // Mapper les statuts de l'API
    let statusClass = 'status-confirmed';
    let statusText = 'Confirmée';

    if (reservation.status === 'pending') {
        statusClass = 'status-pending';
        statusText = 'En attente';
    } else if (reservation.status === 'refused') {
        statusClass = 'status-cancelled';
        statusText = 'Refusée';
    } else if (reservation.status === 'cancelled') {
        statusClass = 'status-cancelled';
        statusText = 'Annulée';
    } else if (isPast) {
        statusClass = 'status-past';
        statusText = 'Passée';
    }

    // Mapper le type de service
    const serviceTypeText = reservation.service_type === 'a_emporter'
        ? '🥡 À emporter (Ailleurs que là-bas)'
        : '🪑 Sur place (Ici pas sur place)';
    const serviceIcon = reservation.service_type === 'a_emporter' ? '🥡' : '🪑';

    card.innerHTML = `
        <div class="reservation-header">
            <div>
                <h3>${reservation.restaurant_name}</h3>
                <p style="color: #666; margin-top: 0.3rem;">📍 ${reservation.address}</p>
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
                <span class="detail-icon">📞</span>
                <span><strong>Téléphone :</strong> ${reservation.phone || 'N/A'}</span>
            </div>
        </div>

        ${reservation.special_requests ? `
            <div class="special-requests">
                <p><strong>💬 Demandes spéciales :</strong> ${reservation.special_requests}</p>
            </div>
        ` : ''}

        <div class="reservation-actions">
            ${!isPast && reservation.status !== 'cancelled' && reservation.status !== 'refused' ? `
                <button class="action-btn btn-cancel" onclick="cancelReservation(${reservation.id})">
                    ❌ Annuler
                </button>
            ` : ''}
            ${isPast && reservation.status === 'confirmed' ? `
                <button class="action-btn btn-review" onclick="addReview(${reservation.restaurant_id})">
                    ⭐ Laisser un avis
                </button>
            ` : ''}
        </div>
    `;

    return card;
}

// Annuler une réservation
async function cancelReservation(reservationId) {
    const confirmed = confirm('Êtes-vous sûr de vouloir annuler cette réservation ?');

    if (confirmed) {
        try {
            await apiRequest(`${API_CONFIG.ENDPOINTS.RESERVATIONS}/${reservationId}`, {
                method: 'DELETE'
            });

            alert('Votre réservation a été annulée');
            loadReservations(); // Recharger les réservations
        } catch (error) {
            alert('Erreur lors de l\'annulation de la réservation: ' + error.message);
        }
    }
}

// Ajouter un avis
function addReview(restaurantId) {
    alert('La fonctionnalité d\'avis sera bientôt disponible');
}

// Charger les réservations au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    loadReservations();
});
