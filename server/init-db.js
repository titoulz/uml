const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

// Créer/ouvrir la base de données
const db = new Database('restaurants.db');

// Lire le fichier SQL
const sqlFile = fs.readFileSync(path.join(__dirname, 'init.sql'), 'utf8');

// Exécuter les commandes SQL
const statements = sqlFile.split(';').filter(stmt => stmt.trim());

statements.forEach(statement => {
    try {
        db.exec(statement);
    } catch (err) {
        if (!err.message.includes('already exists') && !err.message.includes('UNIQUE constraint')) {
            console.error('Erreur SQL:', err.message);
        }
    }
});

console.log('✅ Base de données initialisée avec succès!');
db.close();
