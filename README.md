# 🕌 Restaurants Halal Maghreb - مطاعم حلال المغرب العربي

Une application web interactive pour découvrir et réserver dans les meilleurs restaurants halal de la région de Dijon, avec une ambiance authentique maghrébine.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=flat&logo=javascript&logoColor=%23F7DF1E)

---

## ✨ Fonctionnalités

### 🗺️ Carte Interactive
- Carte Leaflet avec marqueurs personnalisés style maghrébin
- 20 restaurants halal certifiés à Dijon et alentours
- Popups détaillées avec informations et bouton de réservation direct
- Filtrage par type de cuisine

### 👤 Authentification & Rôles
- **Client** : Réserver, consulter ses réservations, gérer son profil
- **Restaurant** : Gérer les réservations, accepter/refuser, voir statistiques
- Base de données fictive en localStorage
- Session persistante avec "Se souvenir de moi"

### 📅 Système de Réservation
- Formulaire complet avec validation en temps réel
- **Choix du service** : À emporter 🥡 ou Sur place 🪑
- Date, heure, nombre de personnes
- Demandes spéciales
- Récapitulatif instantané
- Confirmation par email

### 🎨 Design Maghrébin Authentique
- **Couleurs** : Vert (Algérie), Rouge (Maroc/Tunisie), Or
- **Drapeaux** : Algérie 🇩🇿, Maroc 🇲🇦, Tunisie 🇹🇳
- **Motifs islamiques** géométriques
- **Police arabe** : Amiri & Cairo
- **Texte bilingue** : Arabe/Français
- Badge certification Halal sur tous les restaurants

### 🔊 Effets Sonores
- **"السلام عليكم"** à la connexion/inscription
- **"Ici ou pas sur place ?"** au clic sur Réserver
- Ambiance immersive et authentique

### 📱 Responsive
- Design adaptatif mobile/tablette/desktop
- Navigation fluide
- Interface tactile optimisée

---

## 🚀 Installation

### Prérequis
- Navigateur web moderne (Chrome, Firefox, Safari, Edge)
- Serveur HTTP local (Python, Node.js, ou autre)

### Lancement rapide

```bash
# Cloner le repository
git clone https://github.com/VOTRE_USERNAME/restaurants-halal-maghreb.git
cd restaurants-halal-maghreb

# Lancer un serveur HTTP
python3 -m http.server 3000

# Ou avec Node.js
npx http-server -p 3000

# Ouvrir dans le navigateur
http://localhost:3000
```

---

## 📂 Structure du Projet

```
restaurants-halal-maghreb/
├── index.html                      # Page principale (carte + liste)
├── auth.html                       # Authentification
├── reservation.html                # Formulaire de réservation
├── profile.html                    # Profil utilisateur
├── my-reservations.html            # Réservations client
├── manage-reservations.html        # Gestion restaurant
│
├── style.css                       # Styles maghrébin
├── auth-style.css
├── reservation-style.css
├── profile-style.css
├── my-reservations-style.css
├── manage-reservations-style.css
│
├── script.js                       # Logique principale
├── auth-script.js                  # Authentification
├── reservation-script.js           # Réservations
├── profile-script.js               # Profil
├── my-reservations-script.js       # Vue client
├── manage-reservations-script.js   # Vue restaurant
│
├── images/                         # Assets visuels
│   ├── flag-algeria.svg           # Drapeau Algérie
│   ├── flag-morocco.svg           # Drapeau Maroc
│   ├── flag-tunisia.svg           # Drapeau Tunisie
│   ├── certification-halal.svg    # Badge Halal
│   ├── islamic-pattern.svg        # Motifs géométriques
│   ├── marker-maghreb.svg         # Marqueur carte
│   └── mosque-banner.jpg          # Image mosquée (header)
│
├── fx/                            # Effets sonores
│   ├── salaamaleykum.mp3         # Son connexion
│   └── ici-ou-pas-sur-place_52vRDdVo.mp3
│
└── diagrams/                      # Diagrammes UML
    ├── usecase-diagram.puml
    └── class-diagram.puml
```

---

## 🎯 Utilisation

### Comptes par défaut

#### Client
- **Email** : `test@exemple.com`
- **Mot de passe** : `test123`

#### Restaurant (West Africa)
- **Email** : `contact@westafrica.com`
- **Mot de passe** : `restaurant123`

### Créer un nouveau compte

1. Cliquer sur **"تسجيل الدخول"** (Se connecter)
2. Onglet **"Inscription"**
3. Choisir le rôle :
   - **Client** : Réserver des restaurants
   - **Restaurant** : Gérer les réservations (choisir le restaurant)
4. Remplir les informations
5. **Inscription automatique + connexion**

### Réserver un restaurant

1. **Explorer la carte** ou la liste
2. **Cliquer sur "📅 احجز الآن | Réserver"**
3. Choisir : **À emporter 🥡** ou **Sur place 🪑**
4. Remplir : Date, heure, personnes, coordonnées
5. **Confirmer** la réservation
6. Voir dans **"Mes Réservations"**

### Gérer les réservations (Restaurant)

1. Se connecter en tant que **Restaurant**
2. Accéder à **"🍽️ Gérer les Réservations"**
3. Voir les **statistiques** (en attente, confirmées, refusées)
4. **Filtrer** par statut
5. **Accepter ✅** ou **Refuser ❌** les réservations

---

## 🛠️ Technologies Utilisées

### Frontend
- **HTML5** - Structure
- **CSS3** - Styles (Gradients, Flexbox, Grid, Animations)
- **JavaScript (ES6+)** - Logique métier
- **Leaflet.js** - Cartographie interactive
- **Google Fonts** - Polices arabes (Amiri, Cairo)

### Stockage
- **localStorage** - Base de données fictive
- **sessionStorage** - Sessions temporaires

### Design
- **SVG** - Drapeaux, badges, motifs
- **Audio HTML5** - Effets sonores

---

## 🎨 Palette de Couleurs

| Couleur | Hex | Usage |
|---------|-----|-------|
| Vert Algérie | `#006233` | Accents, badges |
| Rouge Maroc | `#C1272D` | Titres, boutons |
| Rouge Tunisie | `#E70013` | Dégradés |
| Or | `#D4AF37` | Bordures, détails |
| Beige | `#f8f5f0` | Fond |

---

## 📊 Diagrammes UML

Le projet inclut des diagrammes PlantUML :
- **Cas d'utilisation** : Acteurs et fonctionnalités
- **Classes** : Architecture logicielle
- **Séquence** : Flux de réservation

Voir le dossier `diagrams/` pour les fichiers `.puml`

---

## 🌍 Restaurants Inclus

20 restaurants halal certifiés à Dijon et alentours :
- West Africa (Africaine)
- Rochangul (Ouïghour)
- Le Pharaon (Libanaise)
- Sartaj (Indienne)
- Et 16 autres...

Tous **certifiés Halal** ✅ avec badge de certification visible.

---

## 🔐 Sécurité

⚠️ **Note importante** : Cette application est une **démo pédagogique** utilisant localStorage pour simuler une base de données.

**Pour une utilisation en production**, il faudrait :
- Backend sécurisé (Node.js, PHP, Python)
- Base de données réelle (MySQL, PostgreSQL, MongoDB)
- Hashage des mots de passe (bcrypt)
- Authentification JWT ou sessions serveur
- Validation côté serveur
- Protection CSRF/XSS
- HTTPS obligatoire

---

## 🤝 Contribution

Les contributions sont les bienvenues !

1. Fork le projet
2. Créer une branche (`git checkout -b feature/NouvelleFonctionnalite`)
3. Commit (`git commit -m 'Ajout nouvelle fonctionnalité'`)
4. Push (`git push origin feature/NouvelleFonctionnalite`)
5. Ouvrir une Pull Request

---

## 📝 Licence

Ce projet est sous licence **MIT**. Voir le fichier `LICENSE` pour plus de détails.

---

## 👨‍💻 Auteur

**Titouan** - Développement web

---

## 🙏 Remerciements

- **OpenStreetMap** pour les données cartographiques
- **Leaflet.js** pour la bibliothèque de cartes
- **Google Fonts** pour les polices arabes
- La communauté **musulmane** de Dijon pour l'inspiration

---

## 📞 Support

Pour toute question ou suggestion :
- Ouvrir une **Issue** sur GitHub
- Contribuer via **Pull Request**

---

<div align="center">

**السلام عليكم ورحمة الله وبركاته**

Made with ❤️ for the Maghreb community by THOMAS MICHELIN , TOM MARTIN , TITOUAN EL MOUAFIK


🇩🇿 الجزائر | 🇲🇦 المغرب | 🇹🇳 تونس

</div>


