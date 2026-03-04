// Configuration de l'API
const API_CONFIG = {
    BASE_URL: 'https://allo-halal-api.onrender.com/api',

    // Endpoints
    ENDPOINTS: {
        // Auth
        REGISTER: '/auth/register',
        LOGIN: '/auth/login',

        // Users
        UPDATE_USER: (id) => `/users/${id}`,
        DELETE_USER: (id) => `/users/${id}`,

        // Restaurants
        RESTAURANTS: '/restaurants',
        RESTAURANT: (id) => `/restaurants/${id}`,

        // Reservations
        RESERVATIONS: '/reservations',
        USER_RESERVATIONS: (userId) => `/reservations/user/${userId}`,
        RESTAURANT_RESERVATIONS: (restaurantId) => `/reservations/restaurant/${restaurantId}`,
        UPDATE_RESERVATION_STATUS: (id) => `/reservations/${id}/status`,
        CANCEL_RESERVATION: (id) => `/reservations/${id}`,

        // Stats
        RESTAURANT_STATS: (restaurantId) => `/stats/restaurant/${restaurantId}`
    }
};

// Fonction helper pour faire des requêtes API
async function apiRequest(endpoint, options = {}) {
    const url = `${API_CONFIG.BASE_URL}${endpoint}`;

    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const config = { ...defaultOptions, ...options };

    if (config.body && typeof config.body === 'object') {
        config.body = JSON.stringify(config.body);
    }

    try {
        const response = await fetch(url, config);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Erreur API');
        }

        return data;
    } catch (error) {
        console.error('Erreur API:', error);
        throw error;
    }
}

// Export pour utilisation dans d'autres fichiers
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { API_CONFIG, apiRequest };
}
