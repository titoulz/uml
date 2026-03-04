# 🚀 Guide de déploiement sur Vercel

## Prérequis

1. **Créer un compte Vercel gratuit** : https://vercel.com/signup
2. **Avoir Git installé** sur ton ordinateur

## Méthode 1 : Déploiement via GitHub (RECOMMANDÉ)

### Étape 1 : Créer un dépôt GitHub

1. Va sur https://github.com/new
2. Nom du repo : `allo-halal-dijon`
3. Choisis "Public" ou "Private"
4. Clique sur "Create repository"

### Étape 2 : Pousser ton code sur GitHub

Ouvre un terminal dans le dossier de ton projet et tape :

```bash
cd /home/rx/Documents/perso/Titouan/UML
git init
git add .
git commit -m "Initial commit - Allo-Halal application"
git branch -M main
git remote add origin https://github.com/TON_USERNAME/allo-halal-dijon.git
git push -u origin main
```

⚠️ Remplace `TON_USERNAME` par ton nom d'utilisateur GitHub !

### Étape 3 : Connecter Vercel à GitHub

1. Va sur https://vercel.com/dashboard
2. Clique sur "Add New..." → "Project"
3. Clique sur "Import Git Repository"
4. Autorise Vercel à accéder à GitHub
5. Sélectionne ton dépôt `allo-halal-dijon`
6. Clique sur "Import"

### Étape 4 : Configuration du projet

Vercel va détecter automatiquement :
- **Framework Preset**: Other
- **Root Directory**: ./
- **Build Command**: (laisse vide)
- **Output Directory**: (laisse vide)

Clique sur **"Deploy"** !

🎉 **C'est tout !** Ton site sera en ligne dans quelques secondes.

---

## Méthode 2 : Déploiement direct via CLI

Si tu ne veux pas utiliser GitHub :

```bash
cd /home/rx/Documents/perso/Titouan/UML
npx vercel
```

Suis les instructions :
1. "Set up and deploy?" → **Oui**
2. "Which scope?" → Choisis ton compte
3. "Link to existing project?" → **Non**
4. "What's your project's name?" → `allo-halal-dijon`
5. "In which directory is your code located?" → `.`

Vercel va déployer automatiquement !

Pour déployer en production :
```bash
npx vercel --prod
```

---

## ⚠️ Limitations de la version actuelle

**Ce qui fonctionne :**
- ✅ Page d'accueil avec carte interactive
- ✅ Liste des restaurants
- ✅ Page de documentation (info.html)
- ✅ Interface d'authentification
- ✅ Interface de réservation

**Ce qui ne fonctionne PAS (sans backend déployé) :**
- ❌ Inscription / Connexion réelle
- ❌ Création de réservations
- ❌ Gestion des réservations

---

## 🔧 Pour activer toutes les fonctionnalités

Il faut déployer le backend Node.js. Deux options :

### Option A : Backend sur Vercel avec PostgreSQL

1. Installer et configurer PostgreSQL (Vercel Postgres gratuit)
2. Migrer le code de SQLite vers PostgreSQL
3. Déployer l'API en serverless functions

### Option B : Backend séparé

1. Déployer le backend sur **Render.com** (gratuit)
2. Utiliser une base de données PostgreSQL gratuite
3. Modifier `api-config.js` pour pointer vers l'API Render

---

## 📝 Commandes utiles

```bash
# Voir les logs
npx vercel logs

# Lister tes projets
npx vercel list

# Supprimer un déploiement
npx vercel remove [deployment-url]

# Se déconnecter
npx vercel logout

# Se reconnecter
npx vercel login
```

---

## 🌐 Ton URL Vercel

Après le déploiement, tu auras une URL comme :
- `https://allo-halal-dijon.vercel.app`
- ou `https://allo-halal-dijon-ton-username.vercel.app`

Tu peux aussi :
- Ajouter un **domaine personnalisé** gratuit
- Configurer les **variables d'environnement**
- Voir les **analytics** de ton site

---

## 🆘 En cas de problème

1. Vérifie que tous les chemins de fichiers sont corrects
2. Regarde les logs : `npx vercel logs`
3. Vérifie la console Vercel : https://vercel.com/dashboard

---

## 📚 Ressources

- Documentation Vercel : https://vercel.com/docs
- Tutoriel déploiement : https://vercel.com/guides
- Support Vercel : https://vercel.com/support
