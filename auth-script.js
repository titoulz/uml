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

// Base de données fictive d'utilisateurs
class UserDatabase {
    constructor() {
        this.initializeDB();
    }

    initializeDB() {
        if (!localStorage.getItem('usersDB')) {
            const defaultUsers = [
                {
                    id: 1,
                    name: 'Admin User',
                    email: 'admin@restaurant.com',
                    password: 'admin123',
                    role: 'client',
                    createdAt: new Date().toISOString()
                },
                {
                    id: 2,
                    name: 'Test User',
                    email: 'test@exemple.com',
                    password: 'test123',
                    role: 'client',
                    createdAt: new Date().toISOString()
                },
                {
                    id: 3,
                    name: 'West Africa Restaurant',
                    email: 'contact@westafrica.com',
                    password: 'restaurant123',
                    role: 'restaurant',
                    restaurantId: 1,
                    createdAt: new Date().toISOString()
                }
            ];
            localStorage.setItem('usersDB', JSON.stringify(defaultUsers));
        }
    }

    getAllUsers() {
        return JSON.parse(localStorage.getItem('usersDB') || '[]');
    }

    findUserByEmail(email) {
        const users = this.getAllUsers();
        return users.find(user => user.email.toLowerCase() === email.toLowerCase());
    }

    addUser(name, email, password, role, restaurantId = null) {
        const users = this.getAllUsers();
        const newUser = {
            id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
            name,
            email,
            password,
            role,
            restaurantId,
            createdAt: new Date().toISOString()
        };
        users.push(newUser);
        localStorage.setItem('usersDB', JSON.stringify(users));
        return newUser;
    }

    validateCredentials(email, password) {
        const user = this.findUserByEmail(email);
        if (user && user.password === password) {
            return user;
        }
        return null;
    }
}

// Session management
class SessionManager {
    static login(user, rememberMe = false) {
        const session = {
            userId: user.id,
            userName: user.name,
            userEmail: user.email,
            userRole: user.role,
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

// Initialisation
const db = new UserDatabase();

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
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const rememberMe = document.getElementById('remember-me').checked;

    // Validation basique
    if (!email || !password) {
        alert('Veuillez remplir tous les champs');
        return;
    }

    // Validation des credentials
    const user = db.validateCredentials(email, password);

    if (user) {
        SessionManager.login(user, rememberMe);

        // Jouer le son de bienvenue
        playSalaamaleykum();

        alert('Connexion réussie ! Bienvenue ' + user.name);

        // Attendre un peu pour que le son se joue avant la redirection
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    } else {
        alert('Email ou mot de passe incorrect');
    }
});

// Gestion du formulaire d'inscription
registerForm.addEventListener('submit', (e) => {
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

    // Vérifier si l'email existe déjà
    if (db.findUserByEmail(email)) {
        alert('Un compte avec cet email existe déjà');
        return;
    }

    // Pour les restaurants, demander quel restaurant ils gèrent
    let restaurantId = null;
    if (role === 'restaurant') {
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

        const restaurantList = restaurants.map(r => `${r.id}. ${r.name}`).join('\n');
        const selectedId = prompt(
            `Vous vous inscrivez en tant que restaurant.\n\nQuel restaurant gérez-vous ? (Entrez le numéro)\n\n${restaurantList}`
        );

        restaurantId = parseInt(selectedId);
        if (!restaurantId || restaurantId < 1 || restaurantId > 20) {
            alert('Numéro de restaurant invalide');
            return;
        }
    }

    // Créer le nouvel utilisateur
    const newUser = db.addUser(name, email, password, role, restaurantId);

    // Connexion automatique après inscription
    SessionManager.login(newUser, true);

    // Jouer le son de bienvenue
    playSalaamaleykum();

    alert('Inscription réussie ! Bienvenue ' + name);

    // Attendre un peu pour que le son se joue avant la redirection
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
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
