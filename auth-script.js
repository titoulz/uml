// Fonction pour jouer le son de bienvenue
function playSalaamaleykum() {
    // Essayer différents formats audio
    const audioFormats = ['mp3', 'wav', 'ogg'];
    let audioPlayed = false;

    for (const format of audioFormats) {
        try {
            const audio = new Audio(`fx/salaamaleykum.${format}`);
            audio.volume = 0.7; // Volume à 70%

            audio.play().then(() => {
                console.log('🔊 Salaam Aleykum ! Audio joué avec succès');
                audioPlayed = true;
            }).catch(err => {
                console.log(`Impossible de jouer ${format}:`, err.message);
            });

            if (audioPlayed) break;
        } catch (error) {
            console.log(`Format ${format} non disponible`);
        }
    }

    if (!audioPlayed) {
        console.log('⚠️ Aucun fichier audio trouvé dans /fx/');
    }
}

// API Authentication Service
class AuthService {
    static async login(email, password) {
        try {
            const response = await apiRequest(API_CONFIG.ENDPOINTS.LOGIN, {
                method: 'POST',
                body: { email, password }
            });
            return response.user;
        } catch (error) {
            throw new Error(error.message || 'Erreur de connexion');
        }
    }

    static async register(name, email, password, role, restaurantId = null) {
        try {
            const response = await apiRequest(API_CONFIG.ENDPOINTS.REGISTER, {
                method: 'POST',
                body: { name, email, password, role, restaurantId }
            });

            // Après inscription, se connecter automatiquement
            return await this.login(email, password);
        } catch (error) {
            throw new Error(error.message || 'Erreur d\'inscription');
        }
    }
}

// Session management
class SessionManager {
    static login(user, rememberMe = false) {
        const session = {
            userId: user.userId,
            userName: user.userName,
            userEmail: user.userEmail,
            userRole: user.userRole,
            restaurantId: user.restaurantId || null,
            isLoggedIn: true,
            loginTime: new Date().toISOString()
        };

        if (rememberMe) {
            localStorage.setItem('userSession', JSON.stringify(session));
        } else {
            sessionStorage.setItem('userSession', JSON.stringify(session));
        }
    }

    static logout() {
        localStorage.removeItem('userSession');
        sessionStorage.removeItem('userSession');
    }

    static getCurrentUser() {
        const session = localStorage.getItem('userSession') || sessionStorage.getItem('userSession');
        return session ? JSON.parse(session) : null;
    }

    static isLoggedIn() {
        return this.getCurrentUser() !== null;
    }
}

// Éléments du DOM
const loginTab = document.getElementById('login-tab');
const registerTab = document.getElementById('register-tab');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');

// Switch entre connexion et inscription
loginTab.addEventListener('click', () => {
    loginTab.classList.add('active');
    registerTab.classList.remove('active');
    loginForm.classList.add('active');
    registerForm.classList.remove('active');
});

registerTab.addEventListener('click', () => {
    registerTab.classList.add('active');
    loginTab.classList.remove('active');
    registerForm.classList.add('active');
    loginForm.classList.remove('active');
});

// Gestion du formulaire de connexion
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const rememberMe = document.getElementById('remember-me').checked;

    // Validation basique
    if (!email || !password) {
        alert('Veuillez remplir tous les champs');
        return;
    }

    try {
        // Authentification via API
        const user = await AuthService.login(email, password);

        SessionManager.login(user, rememberMe);

        // Jouer le son de bienvenue
        playSalaamaleykum();

        alert('Connexion réussie ! Bienvenue ' + user.userName);

        // Attendre un peu pour que le son se joue avant la redirection
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    } catch (error) {
        alert(error.message);
    }
});

// Gestion du formulaire d'inscription
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const role = document.getElementById('register-role').value;
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm').value;
    const acceptTerms = document.getElementById('accept-terms').checked;

    // Validations
    if (!role) {
        alert('Veuillez sélectionner un type de compte');
        return;
    }

    if (!name || !email || !password || !confirmPassword) {
        alert('Veuillez remplir tous les champs');
        return;
    }

    if (password.length < 6) {
        alert('Le mot de passe doit contenir au moins 6 caractères');
        return;
    }

    if (password !== confirmPassword) {
        alert('Les mots de passe ne correspondent pas');
        return;
    }

    if (!acceptTerms) {
        alert('Veuillez accepter les conditions d\'utilisation');
        return;
    }

    // Pour les restaurants, demander quel restaurant ils gèrent
    let restaurantId = null;
    if (role === 'restaurant') {
        try {
            // Charger la liste des restaurants depuis l'API
            const restaurants = await apiRequest(API_CONFIG.ENDPOINTS.RESTAURANTS);

            const restaurantList = restaurants.map(r => `${r.id}. ${r.name}`).join('\n');
            const selectedId = prompt(
                `Vous vous inscrivez en tant que restaurant.\n\nQuel restaurant gérez-vous ? (Entrez le numéro)\n\n${restaurantList}`
            );

            restaurantId = parseInt(selectedId);
            if (!restaurantId || !restaurants.find(r => r.id === restaurantId)) {
                alert('Numéro de restaurant invalide');
                return;
            }
        } catch (error) {
            alert('Impossible de charger la liste des restaurants');
            return;
        }
    }

    try {
        // Créer le nouvel utilisateur via API
        const user = await AuthService.register(name, email, password, role, restaurantId);

        // Connexion automatique après inscription
        SessionManager.login(user, true);

        // Jouer le son de bienvenue
        playSalaamaleykum();

        alert('Inscription réussie ! Bienvenue ' + user.userName);

        // Attendre un peu pour que le son se joue avant la redirection
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    } catch (error) {
        alert(error.message);
    }
});

// Validation en temps réel du mot de passe
document.getElementById('register-password').addEventListener('input', (e) => {
    const password = e.target.value;
    if (password.length > 0 && password.length < 6) {
        e.target.style.borderColor = '#ff6b6b';
    } else if (password.length >= 6) {
        e.target.style.borderColor = '#51cf66';
    } else {
        e.target.style.borderColor = '#e0e0e0';
    }
});

// Validation de la confirmation du mot de passe
document.getElementById('register-confirm').addEventListener('input', (e) => {
    const password = document.getElementById('register-password').value;
    const confirmPassword = e.target.value;

    if (confirmPassword.length > 0) {
        if (password === confirmPassword) {
            e.target.style.borderColor = '#51cf66';
        } else {
            e.target.style.borderColor = '#ff6b6b';
        }
    } else {
        e.target.style.borderColor = '#e0e0e0';
    }
});
