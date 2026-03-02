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
                    createdAt: new Date().toISOString()
                },
                {
                    id: 2,
                    name: 'Test User',
                    email: 'test@exemple.com',
                    password: 'test123',
                    createdAt: new Date().toISOString()
                }
            ];
            localStorage.setItem('usersDB', JSON.stringify(defaultUsers));
        }
    }

    getAllUsers() {
        return JSON.parse(localStorage.getItem('usersDB') || '[]');
    }

    findUserById(id) {
        const users = this.getAllUsers();
        return users.find(user => user.id === id);
    }

    findUserByEmail(email) {
        const users = this.getAllUsers();
        return users.find(user => user.email.toLowerCase() === email.toLowerCase());
    }

    updateUser(userId, updates) {
        const users = this.getAllUsers();
        const userIndex = users.findIndex(user => user.id === userId);

        if (userIndex !== -1) {
            users[userIndex] = { ...users[userIndex], ...updates };
            localStorage.setItem('usersDB', JSON.stringify(users));
            return users[userIndex];
        }
        return null;
    }

    deleteUser(userId) {
        const users = this.getAllUsers();
        const filteredUsers = users.filter(user => user.id !== userId);
        localStorage.setItem('usersDB', JSON.stringify(filteredUsers));
    }
}

// Session management
class SessionManager {
    static getCurrentUser() {
        const session = localStorage.getItem('userSession') || sessionStorage.getItem('userSession');
        return session ? JSON.parse(session) : null;
    }

    static updateSession(userData) {
        const currentSession = this.getCurrentUser();
        if (!currentSession) return;

        const updatedSession = {
            ...currentSession,
            userName: userData.name,
            userEmail: userData.email
        };

        if (localStorage.getItem('userSession')) {
            localStorage.setItem('userSession', JSON.stringify(updatedSession));
        } else {
            sessionStorage.setItem('userSession', JSON.stringify(updatedSession));
        }
    }

    static logout() {
        localStorage.removeItem('userSession');
        sessionStorage.removeItem('userSession');
        window.location.href = 'index.html';
    }

    static isLoggedIn() {
        return this.getCurrentUser() !== null;
    }
}

// Initialisation
const db = new UserDatabase();

// Vérifier si l'utilisateur est connecté
const currentUser = SessionManager.getCurrentUser();
if (!currentUser) {
    alert('Veuillez vous connecter pour accéder à votre profil');
    window.location.href = 'auth.html';
}

// Charger les données de l'utilisateur
const userData = db.findUserById(currentUser.userId);
if (userData) {
    document.getElementById('profile-name').value = userData.name;
    document.getElementById('profile-email').value = userData.email;
}

// Gestion du formulaire de modification
document.getElementById('profile-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('profile-name').value.trim();
    const email = document.getElementById('profile-email').value.trim();
    const currentPassword = document.getElementById('current-password').value;
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Validation basique
    if (!name || !email) {
        showMessage('Veuillez remplir tous les champs obligatoires', 'error');
        return;
    }

    // Vérifier si l'email est déjà utilisé par un autre compte
    const existingUser = db.findUserByEmail(email);
    if (existingUser && existingUser.id !== currentUser.userId) {
        showMessage('Cet email est déjà utilisé par un autre compte', 'error');
        return;
    }

    const updates = { name, email };

    // Si l'utilisateur veut changer son mot de passe
    if (currentPassword || newPassword || confirmPassword) {
        // Vérifier que tous les champs de mot de passe sont remplis
        if (!currentPassword || !newPassword || !confirmPassword) {
            showMessage('Veuillez remplir tous les champs de mot de passe', 'error');
            return;
        }

        // Vérifier le mot de passe actuel
        if (currentPassword !== userData.password) {
            showMessage('Le mot de passe actuel est incorrect', 'error');
            return;
        }

        // Valider le nouveau mot de passe
        if (newPassword.length < 6) {
            showMessage('Le nouveau mot de passe doit contenir au moins 6 caractères', 'error');
            return;
        }

        // Vérifier la correspondance
        if (newPassword !== confirmPassword) {
            showMessage('Les nouveaux mots de passe ne correspondent pas', 'error');
            return;
        }

        updates.password = newPassword;
    }

    // Mettre à jour l'utilisateur
    const updatedUser = db.updateUser(currentUser.userId, updates);

    if (updatedUser) {
        // Mettre à jour la session
        SessionManager.updateSession(updatedUser);

        // Réinitialiser les champs de mot de passe
        document.getElementById('current-password').value = '';
        document.getElementById('new-password').value = '';
        document.getElementById('confirm-password').value = '';

        showMessage('Vos informations ont été mises à jour avec succès !', 'success');

        // Redirection après 2 secondes
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    } else {
        showMessage('Une erreur est survenue lors de la mise à jour', 'error');
    }
});

// Gestion de la suppression du compte
document.getElementById('delete-account-btn').addEventListener('click', () => {
    const confirmed = confirm(
        'Êtes-vous sûr de vouloir supprimer votre compte ?\n\n' +
        'Cette action est irréversible et toutes vos données seront perdues.'
    );

    if (confirmed) {
        const doubleConfirm = confirm('Dernière confirmation : voulez-vous vraiment supprimer votre compte ?');

        if (doubleConfirm) {
            db.deleteUser(currentUser.userId);
            SessionManager.logout();
            alert('Votre compte a été supprimé');
        }
    }
});

// Validation en temps réel du nouveau mot de passe
document.getElementById('new-password').addEventListener('input', (e) => {
    const password = e.target.value;
    if (password.length > 0 && password.length < 6) {
        e.target.style.borderColor = '#ff6b6b';
    } else if (password.length >= 6) {
        e.target.style.borderColor = '#51cf66';
    } else {
        e.target.style.borderColor = '#e0e0e0';
    }
});

// Validation de la confirmation du nouveau mot de passe
document.getElementById('confirm-password').addEventListener('input', (e) => {
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = e.target.value;

    if (confirmPassword.length > 0) {
        if (newPassword === confirmPassword) {
            e.target.style.borderColor = '#51cf66';
        } else {
            e.target.style.borderColor = '#ff6b6b';
        }
    } else {
        e.target.style.borderColor = '#e0e0e0';
    }
});

// Fonction pour afficher les messages
function showMessage(message, type) {
    // Supprimer les anciens messages
    const oldMessages = document.querySelectorAll('.success-message, .error-message');
    oldMessages.forEach(msg => msg.remove());

    // Créer le nouveau message
    const messageDiv = document.createElement('div');
    messageDiv.className = type === 'success' ? 'success-message' : 'error-message';
    messageDiv.textContent = message;

    // Insérer au début du formulaire
    const form = document.getElementById('profile-form');
    form.insertBefore(messageDiv, form.firstChild);

    // Faire défiler vers le haut
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
