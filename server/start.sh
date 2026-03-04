#!/bin/bash

echo "🚀 Démarrage du serveur Allo-Halal API..."

# Initialiser la base de données
echo "📊 Initialisation de la base de données..."
node init-db.js

# Démarrer le serveur
echo "🌐 Démarrage du serveur..."
node server.js
