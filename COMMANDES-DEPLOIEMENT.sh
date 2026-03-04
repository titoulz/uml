#!/bin/bash

# ========================================
# Script de déploiement Allo-Halal sur Vercel
# ========================================

echo "🚀 Déploiement de Allo-Halal sur Vercel"
echo "========================================"
echo ""

# Étape 1 : Vérifier qu'on est dans le bon dossier
echo "📁 Vérification du dossier..."
if [ ! -f "index.html" ]; then
    echo "❌ Erreur : fichier index.html introuvable"
    echo "Assurez-vous d'être dans le dossier du projet"
    exit 1
fi
echo "✅ Dossier correct"
echo ""

# Étape 2 : Ajouter les fichiers à Git
echo "📦 Ajout des fichiers de configuration..."
git add .vercelignore vercel.json DEPLOIEMENT.md .gitignore
echo "✅ Fichiers ajoutés"
echo ""

# Étape 3 : Créer un commit
echo "💾 Création du commit..."
git commit -m "Add Vercel configuration for deployment"
echo "✅ Commit créé"
echo ""

# Étape 4 : Pousser sur GitHub (si configuré)
echo "⬆️  Tentative de push sur GitHub..."
if git push 2>/dev/null; then
    echo "✅ Code poussé sur GitHub"
else
    echo "⚠️  Pas de remote GitHub configuré (normal si première fois)"
fi
echo ""

# Étape 5 : Déploiement sur Vercel
echo "🌐 Déploiement sur Vercel..."
echo ""
echo "Choisis une option :"
echo "  1) Déploiement en preview (pour tester)"
echo "  2) Déploiement en production"
echo ""
read -p "Ton choix (1 ou 2) : " choice

if [ "$choice" = "1" ]; then
    echo ""
    echo "🔍 Déploiement en preview..."
    npx vercel
elif [ "$choice" = "2" ]; then
    echo ""
    echo "🚀 Déploiement en production..."
    npx vercel --prod
else
    echo "❌ Choix invalide"
    exit 1
fi

echo ""
echo "=========================================="
echo "✅ Déploiement terminé !"
echo "=========================================="
echo ""
echo "📝 Prochaines étapes :"
echo "  1. Copie l'URL fournie par Vercel"
echo "  2. Teste ton site dans un navigateur"
echo "  3. Si tout fonctionne, partage l'URL !"
echo ""
