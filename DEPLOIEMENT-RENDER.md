# 🚀 Déploiement du Backend sur Render

## ✅ Prérequis
- Compte Render créé : https://render.com
- Code pushé sur GitHub

---

## 📝 Étapes de déploiement

### 1. Créer un nouveau Web Service

1. Va sur ton dashboard Render : https://dashboard.render.com/
2. Clique sur **"New +"** → **"Web Service"**
3. Connecte ton repository GitHub `titoulz/uml`
4. Autorise Render à accéder à ton repo si demandé

### 2. Configuration du service

Remplis les champs suivants :

**Informations de base :**
- **Name** : `allo-halal-api`
- **Region** : `Frankfurt (EU Central)` (ou le plus proche)
- **Branch** : `allo-halal`
- **Root Directory** : `server`

**Build & Deploy :**
- **Runtime** : `Node`
- **Build Command** : `npm install`
- **Start Command** : `chmod +x start.sh && ./start.sh`

**Plan :**
- **Instance Type** : `Free` (gratuit)

### 3. Variables d'environnement (optionnel)

Tu peux ajouter ces variables si besoin :
- `NODE_ENV` = `production`
- `PORT` = (laisse vide, Render le définit automatiquement)

### 4. Déployer !

1. Clique sur **"Create Web Service"**
2. Render va :
   - Installer les dépendances (`npm install`)
   - Initialiser la base de données
   - Démarrer le serveur

3. Attends 2-3 minutes ⏳

4. Une fois le déploiement terminé, tu auras une URL comme :
   ```
   https://allo-halal-api.onrender.com
   ```

---

## 🔧 Tester l'API

Une fois déployé, teste ces endpoints :

```bash
# Récupérer tous les restaurants
curl https://allo-halal-api.onrender.com/api/restaurants

# Récupérer un restaurant spécifique
curl https://allo-halal-api.onrender.com/api/restaurants/1
```

Tu devrais recevoir du JSON avec les restaurants !

---

## 🔗 Connecter le Frontend à l'API

Une fois l'API déployée, tu dois mettre à jour le fichier `api-config.js` :

```javascript
const API_CONFIG = {
    BASE_URL: 'https://allo-halal-api.onrender.com',  // ⬅️ Ton URL Render
    ENDPOINTS: {
        RESTAURANTS: '/api/restaurants',
        LOGIN: '/api/auth/login',
        REGISTER: '/api/auth/register',
        RESERVATIONS: '/api/reservations'
    }
};
```

Puis :
1. Commit et push sur GitHub
2. Vercel redéploiera automatiquement

---

## ⚠️ Important : SQLite sur Render

**Limitation :**
Render utilise un système de fichiers éphémère. Cela signifie :
- ✅ La base de données fonctionne
- ❌ **Les données sont perdues au redémarrage** du service (après ~15 min d'inactivité en plan gratuit)

**Solutions :**
1. **Pour une démo** : OK, les données se réinitialisent à chaque démarrage
2. **Pour la production** : Migrer vers PostgreSQL (gratuit sur Render)

---

## 🔄 Redéploiement automatique

Chaque fois que tu push sur la branche `allo-halal`, Render redéploie automatiquement ! 🎉

---

## 📊 Monitoring

Dans le dashboard Render, tu peux :
- Voir les logs en temps réel
- Redémarrer le service
- Voir les métriques (CPU, mémoire)

---

## 🆘 Dépannage

### L'API ne démarre pas
1. Va dans **Logs** sur Render
2. Cherche les erreurs
3. Vérifie que toutes les dépendances sont dans `package.json`

### "Application failed to respond"
- Le service prend 2-3 minutes au premier démarrage
- Attends et réessaye

### Les données disparaissent
- Normal avec SQLite sur Render (plan gratuit)
- Solution : Migrer vers PostgreSQL

---

## 🎯 Prochaine étape : PostgreSQL (optionnel)

Si tu veux des données persistantes :

1. Crée une base PostgreSQL gratuite sur Render
2. Installe `pg` : `npm install pg`
3. Modifie `server.js` pour utiliser PostgreSQL au lieu de SQLite
4. Les données persisteront entre les redémarrages !

---

## 📚 Ressources

- Documentation Render : https://render.com/docs
- Support Render : https://render.com/docs/support
