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

    static getUserReservations(userId) {
        const reservations = this.getAllReservations();
        return reservations.filter(res => res.userId === userId);
    }

    static cancelReservation(reservationId) {
        const reservations = this.getAllReservations();
        const index = reservations.findIndex(r => r.id === reservationId);
        if (index !== -1) {
            reservations[index].status = 'cancelled';
            localStorage.setItem('reservations', JSON.stringify(reservations));
            return true;
        }
        return false;
    }

    static deleteReservation(reservationId) {
        const reservations = this.getAllReservations();
        const filtered = reservations.filter(r => r.id !== reservationId);
        localStorage.setItem('reservations', JSON.stringify(filtered));
    }
}

// Vérifier si l'utilisateur est connecté
const currentUser = SessionManager.getCurrentUser();
if (!currentUser) {
    alert('Veuillez vous connecter pour voir vos réservations');
    window.location.href = 'auth.html';
}

// Récupérer les réservations de l'utilisateur
const userReservations = ReservationManager.getUserReservations(currentUser.userId);

// Séparer les réservations à venir et passées
const today = new Date();
today.setHours(0, 0, 0, 0);

const upcomingReservations = userReservations.filter(res => {
    const resDate = new Date(res.date);
    return resDate >= today && res.status !== 'cancelled';
}).sort((a, b) => new Date(a.date) - new Date(b.date));

const pastReservations = userReservations.filter(res => {
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

// Créer une carte de réservation
function createReservationCard(reservation, isPast) {
    const card = document.createElement('div');
    card.className = `reservation-card ${isPast ? 'past' : ''}`;

    const dateObj = new Date(reservation.date);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = dateObj.toLocaleDateString('fr-FR', options);

    let statusClass = 'status-confirmed';
    let statusText = 'Confirmée';

    if (reservation.status === 'cancelled') {
        statusClass = 'status-cancelled';
        statusText = 'Annulée';
    } else if (isPast) {
        statusClass = 'status-past';
        statusText = 'Passée';
    }

    card.innerHTML = `
        <div class="reservation-header">
            <div>
                <h3>${reservation.restaurantName}</h3>
                <p style="color: #666; margin-top: 0.3rem;">📍 ${reservation.restaurantAddress}</p>
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
            ${!isPast && reservation.status !== 'cancelled' ? `
                <button class="action-btn btn-modify" onclick="modifyReservation(${reservation.id})">
                    ✏️ Modifier
                </button>
                <button class="action-btn btn-cancel" onclick="cancelReservation(${reservation.id})">
                    ❌ Annuler
                </button>
            ` : ''}
            ${isPast && reservation.status !== 'cancelled' ? `
                <button class="action-btn btn-review" onclick="addReview(${reservation.restaurantId})">
                    ⭐ Laisser un avis
                </button>
            ` : ''}
        </div>
    `;

    return card;
}

// Annuler une réservation
function cancelReservation(reservationId) {
    const confirmed = confirm('Êtes-vous sûr de vouloir annuler cette réservation ?');

    if (confirmed) {
        const success = ReservationManager.cancelReservation(reservationId);

        if (success) {
            alert('Votre réservation a été annulée');
            window.location.reload();
        } else {
            alert('Erreur lors de l\'annulation de la réservation');
        }
    }
}

// Modifier une réservation
function modifyReservation(reservationId) {
    alert('La modification de réservation sera bientôt disponible');
}

// Ajouter un avis
function addReview(restaurantId) {
    alert('La fonctionnalité d\'avis sera bientôt disponible');
}
