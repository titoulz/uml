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

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    updateAuthUI();
});

// Restaurants halal à Dijon et environs
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
    {
        id: 2,
        name: "Rochangul",
        address: "86 Rue Godrans, 21000 Dijon",
        type: "Ouïghour",
        lat: 47.3215,
        lng: 5.0405,
        phone: "03 80 XX XX XX"
    },
    {
        id: 3,
        name: "Le Pharaon",
        address: "116 Rue Berbisey, 21000 Dijon",
        type: "Libanaise",
        lat: 47.3185,
        lng: 5.0445,
        phone: "03 80 XX XX XX"
    },
    {
        id: 4,
        name: "Sartaj",
        address: "42 Rue Berbisey, 21000 Dijon",
        type: "Indienne",
        lat: 47.3195,
        lng: 5.0425,
        phone: "03 80 XX XX XX"
    },
    {
        id: 5,
        name: "Shalimar",
        address: "17 Rue de la Poste, 21000 Dijon",
        type: "Indienne/Pakistanaise",
        lat: 47.3225,
        lng: 5.0395,
        phone: "03 80 XX XX XX"
    },
    {
        id: 6,
        name: "Chez Ali",
        address: "24 Rue de la Chouette, 21000 Dijon",
        type: "Maghrébine",
        lat: 47.3210,
        lng: 5.0415,
        phone: "03 80 XX XX XX"
    },
    {
        id: 7,
        name: "Mon Poulet Braisé",
        address: "8 Boulevard de l'Europe, 21800 Quetigny",
        type: "Grillades",
        lat: 47.3115,
        lng: 5.0985,
        phone: "03 80 XX XX XX"
    },
    {
        id: 8,
        name: "Hollywood Canteen",
        address: "77 Rue en Paillery, 21850 Saint-Apollinaire",
        type: "Grillades",
        lat: 47.3415,
        lng: 5.0685,
        phone: "03 80 XX XX XX"
    },
    {
        id: 9,
        name: "A La Braise By Abou",
        address: "35 Rue de Longvic, 21300 Chenôve",
        type: "Poulet Braisé",
        lat: 47.2935,
        lng: 5.0215,
        phone: "03 80 XX XX XX"
    },
    {
        id: 10,
        name: "Table du Garçon Boucher",
        address: "132 Avenue Roland Carraz, 21300 Chenôve",
        type: "Boucherie-Restaurant",
        lat: 47.2885,
        lng: 5.0145,
        phone: "03 80 XX XX XX"
    },
    {
        id: 11,
        name: "BChef Dijon",
        address: "Rue des Godrans, 21000 Dijon",
        type: "Burgers",
        lat: 47.3220,
        lng: 5.0400,
        phone: "03 80 XX XX XX"
    },
    {
        id: 12,
        name: "Babou",
        address: "59 Rue Jeannin, 21000 Dijon",
        type: "Burgers Gourmets",
        lat: 47.3235,
        lng: 5.0385,
        phone: "03 80 XX XX XX"
    },
    {
        id: 13,
        name: "Lycée Kebab",
        address: "18 Boulevard Thiers, 21000 Dijon",
        type: "Kebab",
        lat: 47.3165,
        lng: 5.0365,
        phone: "03 80 XX XX XX"
    },
    {
        id: 14,
        name: "Eden Kebab",
        address: "21 Rue de la Préfecture, 21000 Dijon",
        type: "Kebab",
        lat: 47.3205,
        lng: 5.0425,
        phone: "03 80 XX XX XX"
    },
    {
        id: 15,
        name: "O'Crousti Poulet",
        address: "12 Boulevard des Martyrs de la Résistance, 21000 Dijon",
        type: "Poulet Frit",
        lat: 47.3155,
        lng: 5.0355,
        phone: "03 80 XX XX XX"
    },
    {
        id: 16,
        name: "GOWOK",
        address: "124 Rue d'Auxonne, 21000 Dijon",
        type: "Wok",
        lat: 47.3135,
        lng: 5.0505,
        phone: "03 80 XX XX XX"
    },
    {
        id: 17,
        name: "Chamas Tacos",
        address: "7 Avenue Garibaldi, 21000 Dijon",
        type: "Tacos",
        lat: 47.3175,
        lng: 5.0345,
        phone: "03 80 XX XX XX"
    },
    {
        id: 18,
        name: "Pizza's Smile",
        address: "109 Avenue Jean Jaurès, 21000 Dijon",
        type: "Pizza",
        lat: 47.3185,
        lng: 5.0325,
        phone: "03 80 XX XX XX"
    },
    {
        id: 19,
        name: "Alforno Pizza",
        address: "6 Rue Condorcet, 21000 Dijon",
        type: "Pizza",
        lat: 47.3265,
        lng: 5.0455,
        phone: "03 80 XX XX XX"
    },
    {
        id: 20,
        name: "O'Tacos",
        address: "114 Rue de Mirande, 21000 Dijon",
        type: "Tacos",
        lat: 47.3315,
        lng: 5.0565,
        phone: "03 80 XX XX XX"
    }
];

// Initialisation de la carte centrée sur Dijon
const map = L.map('map').setView([47.3220, 5.0415], 13);

// Ajout du fond de carte OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19
}).addTo(map);

// Icône personnalisée pour les marqueurs - Style Maghrébin
const customIcon = L.icon({
    iconUrl: 'images/marker-maghreb.svg',
    iconSize: [32, 40],
    iconAnchor: [16, 40],
    popupAnchor: [0, -40]
});

// Stockage des marqueurs
const markers = {};

// Ajout des restaurants sur la carte
restaurants.forEach(restaurant => {
    const marker = L.marker([restaurant.lat, restaurant.lng], { icon: customIcon })
        .addTo(map)
        .bindPopup(`
            <div style="font-family: 'Cairo', Arial, sans-serif; min-width: 250px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                    <h3 style="color: #C1272D; margin: 0; font-weight: 700; font-size: 1.2rem;">${restaurant.name}</h3>
                    <img src="images/certification-halal.svg" alt="Certifié Halal" style="width: 35px; height: 35px;" title="Certifié Halal">
                </div>
                <p style="margin: 6px 0; color: #555; font-size: 0.9rem;"><strong style="color: #006233;">📍 Adresse:</strong> ${restaurant.address}</p>
                <p style="margin: 6px 0; color: #555; font-size: 0.9rem;"><strong style="color: #006233;">🍽️ Type:</strong> ${restaurant.type}</p>
                <p style="margin: 6px 0; color: #555; font-size: 0.9rem;"><strong style="color: #006233;">📞 Tél:</strong> ${restaurant.phone}</p>
                <div style="margin: 10px 0; padding: 8px; background: linear-gradient(135deg, #e8f5e9 0%, #f1f8e9 100%); border-radius: 8px; border-left: 4px solid #006233;">
                    <p style="margin: 0; font-size: 0.85em; color: #2e7d32; font-weight: 600;">
                        ✅ مطعم حلال معتمد | Restaurant certifié Halal
                    </p>
                </div>
                <a href="reservation.html?id=${restaurant.id}"
                   onclick="playReservationSound();"
                   style="display: block; margin-top: 12px; padding: 10px 20px;
                          background: linear-gradient(135deg, #C1272D 0%, #E70013 100%);
                          color: white; text-align: center; text-decoration: none;
                          border-radius: 25px; font-weight: 700; font-size: 1rem;
                          border: 2px solid #D4AF37; box-shadow: 0 3px 8px rgba(193, 39, 45, 0.3);
                          transition: all 0.3s ease;">
                    📅 احجز الآن | Réserver
                </a>
            </div>
        `);

    markers[restaurant.id] = marker;
});

// Affichage de la liste des restaurants dans la sidebar
const restaurantList = document.getElementById('restaurant-list');

restaurants.forEach(restaurant => {
    const card = document.createElement('div');
    card.className = 'restaurant-card';
    card.innerHTML = `
        <div class="restaurant-card-header">
            <h3>${restaurant.name}</h3>
            <img src="images/certification-halal.svg" alt="Certifié Halal" class="halal-badge" title="Restaurant certifié Halal">
        </div>
        <p><strong>📍</strong> ${restaurant.address}</p>
        <p><strong>📞</strong> ${restaurant.phone}</p>
        <span class="restaurant-type">${restaurant.type}</span>
        <button class="reserve-btn" onclick="event.stopPropagation(); playReservationSound(); setTimeout(() => { window.location.href='reservation.html?id=${restaurant.id}'; }, 500);">
            📅 احجز الآن | Réserver
        </button>
    `;

    // Au clic sur une carte, centrer la carte et ouvrir le popup
    card.addEventListener('click', () => {
        map.setView([restaurant.lat, restaurant.lng], 13);
        markers[restaurant.id].openPopup();
    });

    restaurantList.appendChild(card);
});
