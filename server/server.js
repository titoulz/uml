const express = require('express');
const Database = require('better-sqlite3');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Connexion à la base de données
const db = new Database('restaurants.db');

// ==================== ROUTES UTILISATEURS ====================

// Inscription
app.post('/api/auth/register', async (req, res) => {
    try {
        const { name, email, password, role, restaurantId } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({ error: 'Tous les champs sont requis' });
        }

        // Vérifier si l'email existe déjà
        const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
        if (existing) {
            return res.status(400).json({ error: 'Cet email est déjà utilisé' });
        }

        // Hasher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insérer l'utilisateur
        const stmt = db.prepare('INSERT INTO users (name, email, password, role, restaurant_id) VALUES (?, ?, ?, ?, ?)');
        const result = stmt.run(name, email, hashedPassword, role, restaurantId || null);

        res.json({
            success: true,
            userId: result.lastInsertRowid
        });
    } catch (err) {
        console.error('Erreur inscription:', err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Connexion
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email et mot de passe requis' });
        }

        // Récupérer l'utilisateur
        const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);

        if (!user) {
            return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
        }

        // Vérifier le mot de passe
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
        }

        // Retourner les infos utilisateur (sans le mot de passe)
        res.json({
            success: true,
            user: {
                userId: user.id,
                userName: user.name,
                userEmail: user.email,
                userRole: user.role,
                restaurantId: user.restaurant_id
            }
        });
    } catch (err) {
        console.error('Erreur connexion:', err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Mettre à jour le profil
app.put('/api/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, currentPassword, newPassword } = req.body;

        // Récupérer l'utilisateur
        const user = db.prepare('SELECT * FROM users WHERE id = ?').get(id);

        if (!user) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }

        // Si changement de mot de passe
        if (newPassword) {
            if (!currentPassword) {
                return res.status(400).json({ error: 'Mot de passe actuel requis' });
            }

            const validPassword = await bcrypt.compare(currentPassword, user.password);
            if (!validPassword) {
                return res.status(401).json({ error: 'Mot de passe actuel incorrect' });
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10);
            db.prepare('UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?')
              .run(name, email, hashedPassword, id);
        } else {
            db.prepare('UPDATE users SET name = ?, email = ? WHERE id = ?')
              .run(name, email, id);
        }

        res.json({ success: true });
    } catch (err) {
        console.error('Erreur mise à jour profil:', err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Supprimer un compte
app.delete('/api/users/:id', (req, res) => {
    try {
        const { id } = req.params;
        db.prepare('DELETE FROM users WHERE id = ?').run(id);
        res.json({ success: true });
    } catch (err) {
        console.error('Erreur suppression compte:', err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// ==================== ROUTES RESTAURANTS ====================

// Récupérer tous les restaurants
app.get('/api/restaurants', (req, res) => {
    try {
        const restaurants = db.prepare('SELECT * FROM restaurants').all();
        res.json(restaurants);
    } catch (err) {
        console.error('Erreur récupération restaurants:', err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Récupérer un restaurant par ID
app.get('/api/restaurants/:id', (req, res) => {
    try {
        const { id } = req.params;
        const restaurant = db.prepare('SELECT * FROM restaurants WHERE id = ?').get(id);

        if (!restaurant) {
            return res.status(404).json({ error: 'Restaurant non trouvé' });
        }

        res.json(restaurant);
    } catch (err) {
        console.error('Erreur récupération restaurant:', err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// ==================== ROUTES RÉSERVATIONS ====================

// Créer une réservation
app.post('/api/reservations', (req, res) => {
    try {
        const { userId, restaurantId, date, time, guests, serviceType, specialRequests } = req.body;

        if (!userId || !restaurantId || !date || !time || !guests || !serviceType) {
            return res.status(400).json({ error: 'Tous les champs requis sont manquants' });
        }

        const stmt = db.prepare(`
            INSERT INTO reservations (user_id, restaurant_id, date, time, guests, service_type, special_requests, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, 'pending')
        `);

        const result = stmt.run(userId, restaurantId, date, time, guests, serviceType, specialRequests || '');

        res.json({
            success: true,
            reservationId: result.lastInsertRowid
        });
    } catch (err) {
        console.error('Erreur création réservation:', err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Récupérer les réservations d'un client
app.get('/api/reservations/user/:userId', (req, res) => {
    try {
        const { userId } = req.params;

        const reservations = db.prepare(`
            SELECT r.*, rest.name as restaurant_name, rest.address, rest.phone, rest.type
            FROM reservations r
            JOIN restaurants rest ON r.restaurant_id = rest.id
            WHERE r.user_id = ?
            ORDER BY r.date DESC, r.time DESC
        `).all(userId);

        res.json(reservations);
    } catch (err) {
        console.error('Erreur récupération réservations client:', err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Récupérer les réservations d'un restaurant
app.get('/api/reservations/restaurant/:restaurantId', (req, res) => {
    try {
        const { restaurantId } = req.params;

        const reservations = db.prepare(`
            SELECT r.*, u.name as user_name, u.email as user_email
            FROM reservations r
            JOIN users u ON r.user_id = u.id
            WHERE r.restaurant_id = ?
            ORDER BY r.date DESC, r.time DESC
        `).all(restaurantId);

        res.json(reservations);
    } catch (err) {
        console.error('Erreur récupération réservations restaurant:', err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Mettre à jour le statut d'une réservation
app.put('/api/reservations/:id/status', (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!['pending', 'confirmed', 'refused', 'cancelled'].includes(status)) {
            return res.status(400).json({ error: 'Statut invalide' });
        }

        db.prepare('UPDATE reservations SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?')
          .run(status, id);

        res.json({ success: true });
    } catch (err) {
        console.error('Erreur mise à jour statut:', err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Annuler une réservation
app.delete('/api/reservations/:id', (req, res) => {
    try {
        const { id } = req.params;
        db.prepare('UPDATE reservations SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?')
          .run('cancelled', id);
        res.json({ success: true });
    } catch (err) {
        console.error('Erreur annulation réservation:', err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// ==================== STATISTIQUES ====================

// Statistiques pour un restaurant
app.get('/api/stats/restaurant/:restaurantId', (req, res) => {
    try {
        const { restaurantId } = req.params;

        const total = db.prepare('SELECT COUNT(*) as count FROM reservations WHERE restaurant_id = ?')
                        .get(restaurantId).count;

        const pending = db.prepare('SELECT COUNT(*) as count FROM reservations WHERE restaurant_id = ? AND status = ?')
                          .get(restaurantId, 'pending').count;

        const confirmed = db.prepare('SELECT COUNT(*) as count FROM reservations WHERE restaurant_id = ? AND status = ?')
                            .get(restaurantId, 'confirmed').count;

        const refused = db.prepare('SELECT COUNT(*) as count FROM reservations WHERE restaurant_id = ? AND status = ?')
                          .get(restaurantId, 'refused').count;

        res.json({
            total,
            pending,
            confirmed,
            refused
        });
    } catch (err) {
        console.error('Erreur statistiques:', err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// ==================== DÉMARRAGE SERVEUR ====================

app.listen(PORT, () => {
    console.log(`✅ Serveur API démarré sur http://localhost:${PORT}`);
    console.log(`📊 Base de données: restaurants.db`);
});

// Fermer la base de données proprement
process.on('SIGINT', () => {
    db.close();
    console.log('\n👋 Serveur arrêté');
    process.exit(0);
});
