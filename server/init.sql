-- Base de données pour l'application Restaurants Halal
-- SQLite

-- Table des utilisateurs
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL CHECK(role IN ('client', 'restaurant')),
    restaurant_id INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Table des restaurants
CREATE TABLE IF NOT EXISTS restaurants (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    type TEXT NOT NULL,
    phone TEXT NOT NULL,
    lat REAL NOT NULL,
    lng REAL NOT NULL,
    certification_halal INTEGER DEFAULT 1
);

-- Table des réservations
CREATE TABLE IF NOT EXISTS reservations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    restaurant_id INTEGER NOT NULL,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    guests INTEGER NOT NULL,
    service_type TEXT NOT NULL CHECK(service_type IN ('sur_place', 'a_emporter')),
    special_requests TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending', 'confirmed', 'refused', 'cancelled')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE
);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_reservations_user ON reservations(user_id);
CREATE INDEX IF NOT EXISTS idx_reservations_restaurant ON reservations(restaurant_id);
CREATE INDEX IF NOT EXISTS idx_reservations_status ON reservations(status);

-- Insertion des restaurants par défaut
INSERT INTO restaurants (id, name, address, type, phone, lat, lng) VALUES
(1, 'West Africa', '64 Rue d''Auxonne, 21000 Dijon', 'Africaine', '03 80 XX XX XX', 47.3145, 5.0485),
(2, 'Rochangul', '86 Rue Godrans, 21000 Dijon', 'Ouïghour', '03 80 XX XX XX', 47.3215, 5.0405),
(3, 'Le Pharaon', '116 Rue Berbisey, 21000 Dijon', 'Libanaise', '03 80 XX XX XX', 47.3185, 5.0445),
(4, 'Sartaj', '42 Rue Berbisey, 21000 Dijon', 'Indienne', '03 80 XX XX XX', 47.3195, 5.0425),
(5, 'Shalimar', '17 Rue de la Poste, 21000 Dijon', 'Indienne/Pakistanaise', '03 80 XX XX XX', 47.3225, 5.0395),
(6, 'Chez Ali', '24 Rue de la Chouette, 21000 Dijon', 'Maghrébine', '03 80 XX XX XX', 47.3210, 5.0415),
(7, 'Mon Poulet Braisé', '8 Boulevard de l''Europe, 21800 Quetigny', 'Grillades', '03 80 XX XX XX', 47.3115, 5.0985),
(8, 'Hollywood Canteen', '77 Rue en Paillery, 21850 Saint-Apollinaire', 'Grillades', '03 80 XX XX XX', 47.3415, 5.0685),
(9, 'A La Braise By Abou', '35 Rue de Longvic, 21300 Chenôve', 'Poulet Braisé', '03 80 XX XX XX', 47.2935, 5.0215),
(10, 'Table du Garçon Boucher', '132 Avenue Roland Carraz, 21300 Chenôve', 'Boucherie-Restaurant', '03 80 XX XX XX', 47.2885, 5.0145),
(11, 'BChef Dijon', 'Rue des Godrans, 21000 Dijon', 'Burgers', '03 80 XX XX XX', 47.3220, 5.0400),
(12, 'Babou', '59 Rue Jeannin, 21000 Dijon', 'Burgers Gourmets', '03 80 XX XX XX', 47.3235, 5.0385),
(13, 'Lycée Kebab', '18 Boulevard Thiers, 21000 Dijon', 'Kebab', '03 80 XX XX XX', 47.3165, 5.0365),
(14, 'Eden Kebab', '21 Rue de la Préfecture, 21000 Dijon', 'Kebab', '03 80 XX XX XX', 47.3205, 5.0425),
(15, 'O''Crousti Poulet', '12 Boulevard des Martyrs de la Résistance, 21000 Dijon', 'Poulet Frit', '03 80 XX XX XX', 47.3155, 5.0355),
(16, 'GOWOK', '124 Rue d''Auxonne, 21000 Dijon', 'Wok', '03 80 XX XX XX', 47.3135, 5.0505),
(17, 'Chamas Tacos', '7 Avenue Garibaldi, 21000 Dijon', 'Tacos', '03 80 XX XX XX', 47.3175, 5.0345),
(18, 'Pizza''s Smile', '109 Avenue Jean Jaurès, 21000 Dijon', 'Pizza', '03 80 XX XX XX', 47.3185, 5.0325),
(19, 'Alforno Pizza', '6 Rue Condorcet, 21000 Dijon', 'Pizza', '03 80 XX XX XX', 47.3265, 5.0455),
(20, 'O''Tacos', '114 Rue de Mirande, 21000 Dijon', 'Tacos', '03 80 XX XX XX', 47.3315, 5.0565);
