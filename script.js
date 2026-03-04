// Fonction pour jouer le son de réservation
function playReservationSound() {
    try {
        const audio = new Audio('fx/ici-ou-pas-sur-place_52vRDdVo.mp3');
        audio.volume = 0.8; // Volume à 80%

        audio.play().then(() => {
            console.log('🔊 Son "Ici ou pas, sur place" joué avec succès !');
        }).catch(err => {
            console.log('⚠️ Erreur lecture audio:', err.message);
        });
    } catch (error) {
        console.log('⚠️ Fichier audio non disponible');
    }
}

// Session management (copié depuis auth-script.js)
class SessionManager {
    static getCurrentUser() {
        const session = localStorage.getItem('userSession') || sessionStorage.getItem('userSession');
        return session ? JSON.parse(session) : null;
    }

    static isLoggedIn() {
        return this.getCurrentUser() !== null;
    }

    static logout() {
        localStorage.removeItem('userSession');
        sessionStorage.removeItem('userSession');
        window.location.reload();
    }
}

// Mise à jour de l'interface selon l'état de connexion
function updateAuthUI() {
    const authSection = document.getElementById('auth-section');
    const navLinks = document.getElementById('nav-links');
    const user = SessionManager.getCurrentUser();

    if (user) {
        // Afficher le menu selon le rôle
        if (user.userRole === 'client') {
            // Menu pour les clients
            navLinks.innerHTML = `
                <a href="my-reservations.html" class="nav-link">📅 Mes Réservations</a>
            `;
        } else if (user.userRole === 'restaurant') {
            // Menu pour les restaurants
            navLinks.innerHTML = `
                <a href="manage-reservations.html" class="nav-link">🍽️ Gérer les Réservations</a>
            `;
        }

        authSection.innerHTML = `
            <div class="user-info">
                <a href="profile.html" class="user-name-link">👤 ${user.userName}</a>
                <button onclick="SessionManager.logout()" class="logout-btn">Déconnexion</button>
            </div>
        `;
    } else {
        navLinks.innerHTML = '';
        authSection.innerHTML = `
            <a href="auth.html" class="auth-btn">Se connecter</a>
        `;
    }
}

// Variable globale pour stocker les restaurants
let restaurants = [];

// Fonction pour charger les restaurants depuis l'API
async function loadRestaurants() {
    try {
        restaurants = await apiRequest(API_CONFIG.ENDPOINTS.RESTAURANTS);
        console.log(`✅ ${restaurants.length} restaurants chargés depuis l'API`);
        initializeMap();
    } catch (error) {
        console.error('❌ Erreur lors du chargement des restaurants:', error);
        alert('Impossible de charger les restaurants. Vérifiez que le serveur API est démarré.');
    }
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    updateAuthUI();
    loadRestaurants();
});

// Restaurants halal à Dijon et environs (DEPRECIÉ - maintenant chargé depuis l'API)
/*
const restaurants = [
    {
        id: 1,
        name: "West Africa",
        address: "64 Rue d'Auxonne, 21000 Dijon",
        type: "Africaine",
        lat: 47.3145,
        lng: 5.0485,
        phone: "03 80 XX XX XX"
    },
*/

// Initialisation de la carte et des marqueurs
let map;
let markers = {};

function initializeMap() {
    // Initialisation de la carte centrée sur Dijon
    map = L.map('map').setView([47.3220, 5.0415], 13);

    // Ajout du fond de carte OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
    }).addTo(map);

    // Ajout des restaurants sur la carte
    restaurants.forEach(restaurant => {
    const marker = L.marker([restaurant.lat, restaurant.lng])
        .addTo(map)
        .bindPopup(`
            <div style="font-family: 'Segoe UI', Arial, sans-serif; min-width: 250px;">
                <h3 style="color: #667eea; margin: 0 0 10px 0; font-weight: 700; font-size: 1.2rem;">${restaurant.name}</h3>
                <p style="margin: 6px 0; color: #555; font-size: 0.9rem;"><strong style="color: #667eea;">📍 Adresse:</strong> ${restaurant.address}</p>
                <p style="margin: 6px 0; color: #555; font-size: 0.9rem;"><strong style="color: #667eea;">🍽️ Type:</strong> ${restaurant.type}</p>
                <p style="margin: 6px 0; color: #555; font-size: 0.9rem;"><strong style="color: #667eea;">📞 Tél:</strong> ${restaurant.phone}</p>
                <div style="margin: 10px 0; padding: 8px; background: #f0f0f0; border-radius: 8px; border-left: 4px solid #667eea;">
                    <p style="margin: 0; font-size: 0.85em; color: #667eea; font-weight: 600;">
                        ✅ Restaurant certifié Halal
                    </p>
                </div>
                <a href="reservation.html?id=${restaurant.id}"
                   onclick="playReservationSound();"
                   style="display: block; margin-top: 12px; padding: 10px 20px;
                          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                          color: white; text-align: center; text-decoration: none;
                          border-radius: 8px; font-weight: 600; font-size: 1rem;
                          box-shadow: 0 3px 8px rgba(102, 126, 234, 0.3);
                          transition: all 0.3s ease;">
                    📅 Réserver
                </a>
            </div>
        `);

        markers[restaurant.id] = marker;
    });

    // Affichage de la liste des restaurants dans la sidebar
    const restaurantList = document.getElementById('restaurant-list');
    restaurantList.innerHTML = ''; // Vider la liste avant de la remplir

    restaurants.forEach(restaurant => {
        const card = document.createElement('div');
        card.className = 'restaurant-card';
        card.innerHTML = `
            <h3>${restaurant.name}</h3>
            <p><strong>📍</strong> ${restaurant.address}</p>
            <p><strong>📞</strong> ${restaurant.phone}</p>
            <span class="cuisine-type">${restaurant.type}</span>
            <a href="reservation.html?id=${restaurant.id}" class="reserve-btn" onclick="event.stopPropagation(); playReservationSound();">
                📅 Réserver
            </a>
        `;

        // Au clic sur une carte, centrer la carte et ouvrir le popup
        card.addEventListener('click', () => {
            map.setView([restaurant.lat, restaurant.lng], 15);
            markers[restaurant.id].openPopup();
        });

        restaurantList.appendChild(card);
    });
}
