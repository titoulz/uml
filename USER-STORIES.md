# 📋 User Stories - Restaurants Halal Maghreb

## 🎯 Phase 0 : Conception & Analyse UML

### US-00-01 : Diagramme de cas d'utilisation
**En tant qu'** analyste système
**Je veux** créer un diagramme de cas d'utilisation complet
**Afin de** identifier tous les acteurs (Client, Restaurant, Système) et leurs interactions principales

**Critères d'acceptation :**
- [ ] Identification des 2 acteurs principaux (Client, Restaurant)
- [ ] Liste de tous les cas d'utilisation (Authentification, Réservation, Gestion)
- [ ] Relations include/extend définies
- [ ] Format PlantUML généré

---

### US-00-02 : Diagramme de classes
**En tant qu'** architecte logiciel
**Je veux** modéliser les classes métier de l'application
**Afin de** définir la structure des données et leurs relations

**Critères d'acceptation :**
- [ ] Classes identifiées : User, Restaurant, Reservation, Session
- [ ] Attributs et méthodes définis pour chaque classe
- [ ] Relations (associations, compositions, héritages) établies
- [ ] Multiplicités précisées
- [ ] Diagramme PlantUML créé

---

### US-00-03 : Diagramme de séquence - Réservation
**En tant qu'** concepteur
**Je veux** modéliser le flux complet d'une réservation
**Afin de** comprendre les interactions entre les objets lors du processus

**Critères d'acceptation :**
- [ ] Acteurs et objets identifiés
- [ ] Messages synchrones/asynchrones définis
- [ ] Boucles et conditions représentées
- [ ] Alternatives (succès/échec) modélisées

---

### US-00-04 : Diagramme de séquence - Authentification
**En tant qu'** concepteur
**Je veux** modéliser le processus de connexion/inscription
**Afin de** visualiser la gestion des sessions et la validation des credentials

**Critères d'acceptation :**
- [ ] Flux de connexion complet
- [ ] Flux d'inscription avec choix de rôle
- [ ] Gestion du "Se souvenir de moi"
- [ ] Cas d'erreur modélisés

---

### US-00-05 : Diagramme d'état - Réservation
**En tant qu'** analyste métier
**Je veux** définir les états d'une réservation
**Afin de** comprendre son cycle de vie complet

**Critères d'acceptation :**
- [ ] États définis : Pending, Confirmed, Refused
- [ ] Transitions identifiées
- [ ] Événements déclencheurs précisés
- [ ] État initial et états finaux marqués

---

### US-00-06 : Diagramme d'activité - Processus de réservation
**En tant qu'** analyste fonctionnel
**Je veux** cartographier le workflow complet de réservation
**Afin de** identifier les décisions, parallélismes et points de contrôle

**Critères d'acceptation :**
- [ ] Activités séquentielles définies
- [ ] Points de décision (choix service, validation)
- [ ] Swimlanes pour chaque acteur
- [ ] Conditions de succès/échec

---

### US-00-07 : Maquettes wireframes
**En tant que** UX designer
**Je veux** créer des maquettes basse fidélité de toutes les pages
**Afin de** valider l'ergonomie avant le développement

**Critères d'acceptation :**
- [ ] Wireframes pour 6 pages (index, auth, reservation, profile, my-reservations, manage-reservations)
- [ ] Navigation entre les pages définie
- [ ] Composants UI identifiés
- [ ] Responsive mobile/desktop esquissé

---

### US-00-08 : Charte graphique Maghreb
**En tant que** designer graphique
**Je veux** définir l'identité visuelle maghrébine
**Afin de** créer une cohérence culturelle et esthétique

**Critères d'acceptation :**
- [ ] Palette de couleurs (vert Algérie, rouge Maroc/Tunisie, or)
- [ ] Typographies arabes (Amiri, Cairo)
- [ ] Motifs islamiques géométriques définis
- [ ] Guidelines d'utilisation des drapeaux
- [ ] Badges et icônes certifications Halal

---

### US-00-09 : Spécifications techniques
**En tant que** lead développeur
**Je veux** rédiger les spécifications techniques détaillées
**Afin de** guider l'implémentation et assurer la qualité

**Critères d'acceptation :**
- [ ] Architecture front-end définie (Vanilla JS, Leaflet.js)
- [ ] Stratégie de stockage (localStorage/sessionStorage)
- [ ] Structure des données JSON
- [ ] APIs JavaScript à créer (UserDatabase, SessionManager, ReservationManager)
- [ ] Conventions de code établies

---

### US-00-10 : Structure de fichiers
**En tant que** architecte front-end
**Je veux** définir l'organisation des fichiers du projet
**Afin de** faciliter la maintenance et la scalabilité

**Critères d'acceptation :**
- [ ] Arborescence définie (racine, /images, /fx, /diagrams)
- [ ] Nomenclature des fichiers établie
- [ ] Séparation HTML/CSS/JS par page
- [ ] Dossiers pour assets (images, sons)

---

## 🔐 Phase 1 : Authentification

### US-01-01 : Page de connexion/inscription
**En tant que** visiteur
**Je veux** accéder à une page d'authentification
**Afin de** créer un compte ou me connecter

**Critères d'acceptation :**
- [ ] Page auth.html créée
- [ ] Formulaire de connexion (email, mot de passe)
- [ ] Formulaire d'inscription (nom, email, mot de passe, rôle)
- [ ] Onglets pour basculer entre connexion et inscription
- [ ] Design responsive

---

### US-01-02 : Base de données utilisateurs fictive
**En tant que** développeur back-end
**Je veux** implémenter une base de données dans localStorage
**Afin de** stocker les utilisateurs sans serveur

**Critères d'acceptation :**
- [ ] Classe UserDatabase créée
- [ ] Méthodes : addUser(), getUserByEmail(), validateUser()
- [ ] Stockage dans localStorage avec clé 'usersDB'
- [ ] Structure JSON : { id, name, email, password, role, restaurantId }

---

### US-01-03 : Inscription avec choix de rôle
**En tant que** nouveau visiteur
**Je veux** choisir mon rôle lors de l'inscription (Client ou Restaurant)
**Afin de** accéder aux fonctionnalités adaptées

**Critères d'acceptation :**
- [ ] Radio buttons pour choisir Client ou Restaurant
- [ ] Si Restaurant, select pour choisir le restaurant parmi les 20
- [ ] Validation : tous les champs obligatoires
- [ ] Compte créé avec role et restaurantId stockés

---

### US-01-04 : Connexion et session
**En tant qu'** utilisateur
**Je veux** me connecter avec mes identifiants
**Afin de** accéder à mon espace personnel

**Critères d'acceptation :**
- [ ] Validation email + mot de passe
- [ ] Session créée dans sessionStorage ou localStorage (selon "Se souvenir")
- [ ] Redirection vers index.html après connexion
- [ ] Classe SessionManager avec getCurrentUser(), isLoggedIn()

---

### US-01-05 : Son "Salaam Aleykum" à la connexion
**En tant qu'** utilisateur musulman
**Je veux** entendre "السلام عليكم" quand je me connecte
**Afin de** ressentir une ambiance culturelle authentique

**Critères d'acceptation :**
- [ ] Fichier audio salaamaleykum.mp3 dans /fx
- [ ] Fonction playSalaamaleykum() créée
- [ ] Son joué après connexion réussie
- [ ] Son joué après inscription réussie
- [ ] Volume ajusté à 0.7
- [ ] Délai avant redirection pour laisser jouer le son

---

### US-01-06 : Comptes par défaut
**En tant que** testeur
**Je veux** avoir des comptes pré-créés
**Afin de** tester rapidement les fonctionnalités

**Critères d'acceptation :**
- [ ] Compte Client : test@exemple.com / test123
- [ ] Compte Restaurant (West Africa) : contact@westafrica.com / restaurant123
- [ ] Comptes créés automatiquement au premier lancement
- [ ] Documentés dans README.md

---

### US-01-07 : "Se souvenir de moi"
**En tant qu'** utilisateur
**Je veux** une option pour rester connecté
**Afin de** ne pas avoir à me reconnecter à chaque visite

**Critères d'acceptation :**
- [ ] Checkbox "Se souvenir de moi" dans le formulaire de connexion
- [ ] Si coché : session dans localStorage (persistante)
- [ ] Si non coché : session dans sessionStorage (expire à la fermeture)

---

### US-01-08 : Déconnexion
**En tant qu'** utilisateur connecté
**Je veux** pouvoir me déconnecter
**Afin de** sécuriser mon compte

**Critères d'acceptation :**
- [ ] Bouton "Se déconnecter" visible quand connecté
- [ ] Suppression de la session (localStorage et sessionStorage)
- [ ] Redirection vers index.html
- [ ] Menu mis à jour (afficher "Se connecter")

---

## 🗺️ Phase 2 : Carte Interactive

### US-02-01 : Intégration Leaflet.js
**En tant que** développeur front-end
**Je veux** intégrer la bibliothèque Leaflet.js
**Afin de** afficher une carte interactive

**Critères d'acceptation :**
- [ ] CDN Leaflet ajouté dans index.html
- [ ] Conteneur #map créé avec hauteur fixe
- [ ] Carte initialisée centrée sur Dijon
- [ ] Tuiles OpenStreetMap chargées

---

### US-02-02 : Liste des 20 restaurants halal
**En tant que** développeur
**Je veux** créer un tableau de restaurants
**Afin de** stocker les données des établissements

**Critères d'acceptation :**
- [ ] Array avec 20 restaurants
- [ ] Champs : id, name, lat, lng, address, cuisine, phone
- [ ] Coordonnées géographiques précises (Dijon)
- [ ] Types de cuisine variés (Africaine, Libanaise, Indienne, etc.)

---

### US-02-03 : Marqueurs personnalisés Maghreb
**En tant que** designer
**Je veux** créer un marqueur SVG aux couleurs du Maghreb
**Afin de** renforcer l'identité visuelle

**Critères d'acceptation :**
- [ ] SVG marker-maghreb.svg créé
- [ ] Gradient tricolore (vert, rouge, or)
- [ ] Icône intégrée dans Leaflet avec L.icon()
- [ ] Taille adaptée (40x56 pixels)

---

### US-02-04 : Popups avec informations restaurants
**En tant que** visiteur
**Je veux** cliquer sur un marqueur pour voir les détails
**Afin de** découvrir les informations du restaurant

**Critères d'acceptation :**
- [ ] Popup contenant : nom, adresse, type de cuisine, téléphone
- [ ] Badge "Certifié Halal" visible
- [ ] Bouton "Réserver" dans la popup
- [ ] Design cohérent avec la charte Maghreb

---

### US-02-05 : Réservation depuis la carte
**En tant que** client
**Je veux** réserver directement depuis la popup
**Afin de** simplifier le parcours utilisateur

**Critères d'acceptation :**
- [ ] Bouton "📅 احجز الآن | Réserver" dans la popup
- [ ] Clic lance le son "ici-ou-pas-sur-place"
- [ ] Redirection vers reservation.html?restaurant=ID
- [ ] ID du restaurant passé en paramètre URL

---

### US-02-06 : Filtrage par type de cuisine
**En tant que** visiteur
**Je veux** filtrer les restaurants par type de cuisine
**Afin de** trouver rapidement ce que je cherche

**Critères d'acceptation :**
- [ ] Boutons de filtre (Tous, Africaine, Libanaise, Indienne, etc.)
- [ ] Clic masque/affiche les marqueurs correspondants
- [ ] Liste en dessous de la carte également filtrée
- [ ] Compteur "X restaurants trouvés"

---

## 🍽️ Phase 3 : Système de Réservation

### US-03-01 : Page de réservation
**En tant que** client
**Je veux** accéder à une page dédiée pour réserver
**Afin de** remplir toutes les informations nécessaires

**Critères d'acceptation :**
- [ ] Page reservation.html créée
- [ ] Récupération du restaurant depuis URL (?restaurant=ID)
- [ ] Nom du restaurant affiché dans le header
- [ ] Formulaire complet visible

---

### US-03-02 : Choix du type de service
**En tant que** client
**Je veux** choisir entre "À emporter" et "Sur place"
**Afin de** indiquer comment je souhaite consommer

**Critères d'acceptation :**
- [ ] Deux cartes cliquables avec icônes (🥡 🪑)
- [ ] Radio buttons cachés, sélection visuelle sur la carte
- [ ] Carte sélectionnée : fond vert, bordure dorée
- [ ] Textes : "À emporter (Ailleurs que là-bas)" et "Sur place (Ici pas sur place)"
- [ ] Champ obligatoire

---

### US-03-03 : Son "Ici ou pas sur place"
**En tant que** client
**Je veux** entendre une phrase humoristique lors du clic
**Afin de** vivre une expérience ludique

**Critères d'acceptation :**
- [ ] Fichier audio ici-ou-pas-sur-place_52vRDdVo.mp3 dans /fx
- [ ] Fonction playReservationSound() créée
- [ ] Son joué au clic sur bouton "Réserver" (carte ou liste)
- [ ] Volume ajusté à 0.8

---

### US-03-04 : Formulaire complet
**En tant que** client
**Je veux** remplir tous les détails de ma réservation
**Afin de** fournir les informations nécessaires au restaurant

**Critères d'acceptation :**
- [ ] Champs : date, heure, nombre de personnes, nom, téléphone, email
- [ ] Champ optionnel : demandes spéciales (textarea)
- [ ] Validation HTML5 (required, type="email", min/max)
- [ ] Validation JavaScript avant soumission

---

### US-03-05 : Validation en temps réel
**En tant que** client
**Je veux** voir les erreurs immédiatement
**Afin de** corriger mes saisies rapidement

**Critères d'acceptation :**
- [ ] Date : minimum aujourd'hui
- [ ] Heure : plages horaires de service (11h-14h, 18h-22h)
- [ ] Personnes : entre 1 et 20
- [ ] Email : format valide
- [ ] Messages d'erreur en français, style rouge

---

### US-03-06 : Récapitulatif instantané
**En tant que** client
**Je veux** voir un résumé de ma réservation en temps réel
**Afin de** vérifier mes informations avant validation

**Critères d'acceptation :**
- [ ] Section "Récapitulatif" affichée à droite (desktop) ou en bas (mobile)
- [ ] Mise à jour automatique lors de la saisie
- [ ] Affichage : restaurant, type de service, date, heure, personnes
- [ ] Icônes pour chaque information

---

### US-03-07 : Sauvegarde de la réservation
**En tant que** développeur
**Je veux** stocker les réservations dans localStorage
**Afin de** permettre leur consultation ultérieure

**Critères d'acceptation :**
- [ ] Structure JSON : { id, restaurantId, restaurantName, userId, serviceType, serviceTypeText, date, time, guests, guestName, guestPhone, guestEmail, specialRequests, status, createdAt }
- [ ] ID unique généré (timestamp)
- [ ] Status initial : 'pending'
- [ ] Array 'reservations' dans localStorage

---

### US-03-08 : Confirmation et redirection
**En tant que** client
**Je veux** recevoir une confirmation après réservation
**Afin de** savoir que ma demande a été prise en compte

**Critères d'acceptation :**
- [ ] Message de succès affiché (alert ou modal)
- [ ] Texte : "Réservation confirmée ! Le restaurant vous contactera."
- [ ] Redirection automatique vers my-reservations.html après 2 secondes

---

## 👤 Phase 4 : Gestion du Profil

### US-04-01 : Page de profil
**En tant qu'** utilisateur connecté
**Je veux** accéder à une page de profil
**Afin de** consulter et modifier mes informations

**Critères d'acceptation :**
- [ ] Page profile.html créée
- [ ] Vérification de la session (redirect si non connecté)
- [ ] Affichage des informations actuelles (nom, email, rôle)
- [ ] Formulaires de modification

---

### US-04-02 : Modification des informations
**En tant qu'** utilisateur
**Je veux** modifier mon nom et email
**Afin de** maintenir mes données à jour

**Critères d'acceptation :**
- [ ] Champs pré-remplis avec les valeurs actuelles
- [ ] Validation : nom et email obligatoires
- [ ] Mise à jour dans localStorage
- [ ] Mise à jour de la session active
- [ ] Message de confirmation

---

### US-04-03 : Changement de mot de passe
**En tant qu'** utilisateur
**Je veux** changer mon mot de passe
**Afin de** sécuriser mon compte

**Critères d'acceptation :**
- [ ] Champs : ancien mot de passe, nouveau, confirmation
- [ ] Validation : ancien mot de passe correct
- [ ] Validation : nouveau mot de passe = confirmation
- [ ] Validation : minimum 6 caractères
- [ ] Mise à jour dans localStorage
- [ ] Message de succès

---

### US-04-04 : Suppression de compte
**En tant qu'** utilisateur
**Je veux** supprimer mon compte
**Afin de** exercer mon droit à l'oubli

**Critères d'acceptation :**
- [ ] Bouton "Supprimer le compte" dans une "Danger Zone"
- [ ] Confirmation requise (window.confirm)
- [ ] Suppression du compte dans usersDB
- [ ] Suppression de la session
- [ ] Redirection vers index.html
- [ ] Message informatif

---

## 📅 Phase 5 : Mes Réservations (Client)

### US-05-01 : Page "Mes Réservations"
**En tant que** client connecté
**Je veux** consulter toutes mes réservations
**Afin de** suivre leur statut

**Critères d'acceptation :**
- [ ] Page my-reservations.html créée
- [ ] Vérification : utilisateur connecté et rôle = client
- [ ] Liste de toutes les réservations de l'utilisateur
- [ ] Tri par date (plus récentes en premier)

---

### US-05-02 : Cartes de réservation
**En tant que** client
**Je veux** voir chaque réservation sous forme de carte
**Afin de** lire facilement les informations

**Critères d'acceptation :**
- [ ] Carte avec header : numéro de réservation + statut (badge coloré)
- [ ] Détails : type de service, date, heure, nombre de personnes
- [ ] Informations restaurant : nom, téléphone, email
- [ ] Demandes spéciales affichées si présentes
- [ ] Date de création affichée

---

### US-05-03 : Statuts visuels
**En tant que** client
**Je veux** identifier rapidement le statut de mes réservations
**Afin de** savoir lesquelles sont confirmées

**Critères d'acceptation :**
- [ ] Badge "En attente" : fond orange
- [ ] Badge "Confirmée" : fond vert
- [ ] Badge "Refusée" : fond rouge
- [ ] Couleur de bordure de la carte selon le statut

---

### US-05-04 : Message si aucune réservation
**En tant que** nouveau client
**Je veux** voir un message explicatif si je n'ai pas de réservation
**Afin de** comprendre pourquoi la page est vide

**Critères d'acceptation :**
- [ ] Message : "Aucune réservation pour le moment"
- [ ] Icône 📅
- [ ] Lien vers index.html pour découvrir les restaurants

---

## 🍽️ Phase 6 : Gestion Réservations (Restaurant)

### US-06-01 : Page "Gérer les Réservations"
**En tant que** restaurant connecté
**Je veux** accéder à un tableau de bord
**Afin de** gérer les demandes de réservation

**Critères d'acceptation :**
- [ ] Page manage-reservations.html créée
- [ ] Vérification : utilisateur connecté et rôle = restaurant
- [ ] Nom du restaurant affiché dans le header
- [ ] Liste des réservations pour ce restaurant uniquement

---

### US-06-02 : Statistiques
**En tant que** restaurant
**Je veux** voir des statistiques sur mes réservations
**Afin de** avoir une vue d'ensemble

**Critères d'acceptation :**
- [ ] 4 cartes statistiques : En attente, Confirmées, Refusées, Total
- [ ] Mise à jour en temps réel
- [ ] Icônes adaptées (⏳ ✅ ❌ 📊)
- [ ] Couleurs selon le statut

---

### US-06-03 : Filtrage par statut
**En tant que** restaurant
**Je veux** filtrer les réservations par statut
**Afin de** me concentrer sur celles à traiter

**Critères d'acceptation :**
- [ ] Boutons de filtre : Toutes, En attente, Confirmées, Refusées
- [ ] Bouton actif visuellement distinct
- [ ] Liste filtrée instantanément
- [ ] Compteur mis à jour

---

### US-06-04 : Accepter une réservation
**En tant que** restaurant
**Je veux** accepter une réservation
**Afin de** confirmer la table au client

**Critères d'acceptation :**
- [ ] Bouton "✅ Accepter" visible pour les réservations "pending"
- [ ] Confirmation requise (window.confirm)
- [ ] Status mis à jour en "confirmed"
- [ ] statusUpdatedAt enregistré
- [ ] Liste rechargée automatiquement
- [ ] Message de succès

---

### US-06-05 : Refuser une réservation
**En tant que** restaurant
**Je veux** refuser une réservation
**Afin de** informer le client en cas d'indisponibilité

**Critères d'acceptation :**
- [ ] Bouton "❌ Refuser" visible pour les réservations "pending" ou "confirmed"
- [ ] Confirmation requise
- [ ] Status mis à jour en "refused"
- [ ] statusUpdatedAt enregistré
- [ ] Liste rechargée
- [ ] Message informatif

---

### US-06-06 : Informations client visibles
**En tant que** restaurant
**Je veux** voir les coordonnées du client
**Afin de** pouvoir le contacter si nécessaire

**Critères d'acceptation :**
- [ ] Nom, téléphone, email affichés
- [ ] Demandes spéciales mises en évidence
- [ ] Type de service clairement indiqué
- [ ] Nombre de personnes visible

---

## 🎨 Phase 7 : Design Maghrébin

### US-07-01 : Drapeaux des pays du Maghreb
**En tant que** designer
**Je veux** créer les drapeaux SVG d'Algérie, Maroc, Tunisie
**Afin de** représenter l'identité maghrébine

**Critères d'acceptation :**
- [ ] flag-algeria.svg : vert/blanc avec croissant et étoile rouges
- [ ] flag-morocco.svg : rouge avec pentagramme vert
- [ ] flag-tunisia.svg : rouge avec cercle blanc, croissant et étoile rouges
- [ ] Dimensions identiques (300x200)
- [ ] Banner avec les 3 drapeaux en dessous du header

---

### US-07-02 : Motifs islamiques géométriques
**En tant que** designer
**Je veux** créer un pattern SVG de motifs géométriques
**Afin de** décorer le fond de l'application

**Critères d'acceptation :**
- [ ] Fichier islamic-pattern.svg créé
- [ ] Motif répétable (étoiles à 8 branches)
- [ ] Couleurs subtiles (beige/or)
- [ ] Pattern appliqué en background du body

---

### US-07-03 : Badge certification Halal
**En tant que** designer
**Je veux** créer un badge "Certifié Halal"
**Afin de** rassurer les utilisateurs musulmans

**Critères d'acceptation :**
- [ ] Fichier certification-halal.svg créé
- [ ] Forme circulaire avec bordure verte
- [ ] Texte arabe "حلال" au centre
- [ ] Badge affiché sur toutes les cartes de restaurants

---

### US-07-04 : Image mosquée en banner
**En tant que** designer
**Je veux** intégrer une photo de mosquée dans le header
**Afin de** renforcer l'ambiance islamique

**Critères d'acceptation :**
- [ ] Image mosque-banner.jpg ajoutée
- [ ] Background du header avec image + gradient overlay
- [ ] Opacité du gradient à 40% pour bien voir la mosquée
- [ ] Texte lisible avec text-shadow

---

### US-07-05 : Typographies arabes
**En tant que** développeur front-end
**Je veux** utiliser des polices arabes authentiques
**Afin de** améliorer l'esthétique du texte arabe

**Critères d'acceptation :**
- [ ] Google Fonts importées : Amiri (serif), Cairo (sans-serif)
- [ ] Amiri pour les titres arabes
- [ ] Cairo pour le corps de texte
- [ ] Fallback vers polices système

---

### US-07-06 : Texte bilingue arabe/français
**En tant que** rédacteur de contenu
**Je veux** traduire tous les textes en arabe
**Afin de** rendre l'application accessible aux arabophones

**Critères d'acceptation :**
- [ ] Titre : "مطاعم حلال - المغرب العربي | Restaurants Halal Maghreb"
- [ ] Boutons bilingues : "احجز الآن | Réserver", "تسجيل الدخول | Se connecter"
- [ ] Direction RTL pour les sections en arabe
- [ ] Unicode correctement encodé (UTF-8)

---

### US-07-07 : Palette de couleurs Maghreb
**En tant que** designer
**Je veux** appliquer les couleurs symboliques du Maghreb
**Afin de** créer une identité visuelle forte

**Critères d'acceptation :**
- [ ] Vert Algérie (#006233) pour accents
- [ ] Rouge Maroc (#C1272D) pour titres et boutons
- [ ] Rouge Tunisie (#E70013) pour dégradés
- [ ] Or (#D4AF37) pour bordures et détails
- [ ] Beige (#f8f5f0) pour fond
- [ ] Charte documentée dans README.md

---

### US-07-08 : Animations et transitions
**En tant que** développeur front-end
**Je veux** ajouter des animations fluides
**Afin de** améliorer l'expérience utilisateur

**Critères d'acceptation :**
- [ ] Transitions sur hover (boutons, cartes)
- [ ] Animations d'apparition (fade-in)
- [ ] Transform scale sur les cartes de service
- [ ] Durée : 0.3s en moyenne
- [ ] Easing : ease-in-out

---

## 📱 Phase 8 : Responsive Design

### US-08-01 : Breakpoints
**En tant que** développeur CSS
**Je veux** définir des breakpoints pour différents devices
**Afin de** adapter la mise en page

**Critères d'acceptation :**
- [ ] Mobile : < 768px
- [ ] Tablette : 768px - 1024px
- [ ] Desktop : > 1024px
- [ ] Media queries définies dans tous les fichiers CSS

---

### US-08-02 : Navigation mobile
**En tant qu'** utilisateur mobile
**Je veux** une navigation adaptée à l'écran tactile
**Afin de** naviguer facilement

**Critères d'acceptation :**
- [ ] Menu hamburger pour mobile
- [ ] Boutons suffisamment grands (min 44x44px)
- [ ] Espacement adapté pour le touch
- [ ] Pas de hover sur mobile (focus sur tap)

---

### US-08-03 : Carte responsive
**En tant qu'** utilisateur mobile
**Je veux** que la carte soit utilisable sur petit écran
**Afin de** trouver les restaurants facilement

**Critères d'acceptation :**
- [ ] Hauteur de la carte adaptée (400px sur mobile)
- [ ] Contrôles de zoom accessibles
- [ ] Popups lisibles sur mobile
- [ ] Pas de débordement

---

### US-08-04 : Formulaires tactiles
**En tant qu'** utilisateur mobile
**Je veux** remplir les formulaires confortablement
**Afin de** effectuer mes réservations sur téléphone

**Critères d'acceptation :**
- [ ] Inputs de type adapté (type="date", "time", "tel", "email")
- [ ] Clavier adapté selon le champ (numérique pour tel)
- [ ] Labels toujours visibles
- [ ] Boutons pleine largeur sur mobile

---

## 🧪 Phase 9 : Tests & Qualité

### US-09-01 : Tests unitaires JavaScript
**En tant que** développeur
**Je veux** tester les fonctions critiques
**Afin de** garantir leur bon fonctionnement

**Critères d'acceptation :**
- [ ] Tests pour UserDatabase (addUser, validateUser)
- [ ] Tests pour SessionManager (getCurrentUser, isLoggedIn)
- [ ] Tests pour ReservationManager (CRUD operations)
- [ ] Framework : Jest ou Mocha
- [ ] Coverage > 80%

---

### US-09-02 : Tests d'intégration
**En tant que** testeur
**Je veux** tester les parcours complets
**Afin de** valider les fonctionnalités end-to-end

**Critères d'acceptation :**
- [ ] Parcours : Inscription → Connexion → Réservation → Mes Réservations
- [ ] Parcours : Restaurant accepte/refuse une réservation
- [ ] Framework : Cypress ou Playwright
- [ ] Tests automatisés

---

### US-09-03 : Validation HTML/CSS
**En tant que** développeur
**Je veux** valider le code HTML et CSS
**Afin de** respecter les standards W3C

**Critères d'acceptation :**
- [ ] Toutes les pages HTML validées sur validator.w3.org
- [ ] CSS validé sur jigsaw.w3.org
- [ ] Pas d'erreurs, warnings acceptables
- [ ] Accessibilité WCAG 2.1 niveau AA

---

### US-09-04 : Tests de performance
**En tant que** développeur
**Je veux** mesurer les performances
**Afin de** optimiser le chargement

**Critères d'acceptation :**
- [ ] Lighthouse score > 90
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3s
- [ ] Images optimisées (SVG < 50ko, JPG compressé)

---

### US-09-05 : Tests navigateurs
**En tant que** testeur
**Je veux** vérifier la compatibilité
**Afin de** supporter un maximum de navigateurs

**Critères d'acceptation :**
- [ ] Chrome (dernières 2 versions)
- [ ] Firefox (dernières 2 versions)
- [ ] Safari (dernières 2 versions)
- [ ] Edge (dernières 2 versions)
- [ ] Tests manuels + screenshots

---

## 📚 Phase 10 : Documentation

### US-10-01 : README.md complet
**En tant que** contributeur potentiel
**Je veux** une documentation complète
**Afin de** comprendre et utiliser le projet

**Critères d'acceptation :**
- [ ] Description du projet avec emojis
- [ ] Liste des fonctionnalités
- [ ] Instructions d'installation
- [ ] Guide d'utilisation
- [ ] Technologies utilisées
- [ ] Palette de couleurs
- [ ] Structure des fichiers
- [ ] Comptes par défaut
- [ ] Avertissements de sécurité
- [ ] Guidelines de contribution
- [ ] Licence

---

### US-10-02 : Documentation du code
**En tant que** développeur futur
**Je veux** des commentaires dans le code
**Afin de** comprendre la logique métier

**Critères d'acceptation :**
- [ ] JSDoc pour toutes les classes et méthodes
- [ ] Commentaires pour les sections complexes
- [ ] Pas de sur-commentaire (code self-documenting)
- [ ] Exemples d'utilisation pour les APIs

---

### US-10-03 : Fichier CHOIX-SERVICE.md
**En tant que** équipe produit
**Je veux** documenter la fonctionnalité du choix de service
**Afin de** garder une trace des décisions

**Critères d'acceptation :**
- [ ] Description de la fonctionnalité
- [ ] Fichiers modifiés listés
- [ ] Design expliqué (couleurs, animations)
- [ ] Structure des données
- [ ] Procédure de test

---

### US-10-04 : Diagrammes UML exportés
**En tant que** architecte
**Je veux** exporter les diagrammes en PNG
**Afin de** les inclure dans la documentation

**Critères d'acceptation :**
- [ ] Tous les .puml convertis en PNG
- [ ] Résolution suffisante (300 DPI minimum)
- [ ] Stockés dans /diagrams
- [ ] Référencés dans README.md

---

## 🚀 Phase 11 : Déploiement

### US-11-01 : Initialisation Git
**En tant que** développeur
**Je veux** initialiser un repository Git
**Afin de** versionner le code

**Critères d'acceptation :**
- [ ] git init exécuté
- [ ] Branche principale : main
- [ ] .gitignore créé et configuré
- [ ] Premier commit réalisé

---

### US-11-02 : Fichier .gitignore
**En tant que** développeur
**Je veux** ignorer les fichiers inutiles
**Afin de** garder un repository propre

**Critères d'acceptation :**
- [ ] Fichiers de sauvegarde (*.bak, *-old.*)
- [ ] Fichiers système (.DS_Store, Thumbs.db)
- [ ] Fichiers IDE (.vscode/, .idea/)
- [ ] Logs (*.log)
- [ ] node_modules/ (si ajouté plus tard)
- [ ] Fichiers d'environnement (.env)

---

### US-11-03 : Commit initial
**En tant que** développeur
**Je veux** créer un commit initial structuré
**Afin de** avoir un historique propre

**Critères d'acceptation :**
- [ ] Message de commit détaillé avec emojis
- [ ] Liste des fonctionnalités principales
- [ ] Liste des technologies
- [ ] Nombre de fichiers inclus (40)

---

### US-11-04 : Repository GitHub
**En tant que** développeur
**Je veux** pousser le code sur GitHub
**Afin de** partager le projet

**Critères d'acceptation :**
- [ ] Repository créé sur github.com
- [ ] Nom : restaurants-halal-maghreb
- [ ] Description bilingue
- [ ] Visibilité : Public
- [ ] Remote origin ajouté
- [ ] Code pushé sur main

---

### US-11-05 : Licence MIT
**En tant que** mainteneur
**Je veux** ajouter une licence open source
**Afin de** clarifier les droits d'utilisation

**Critères d'acceptation :**
- [ ] Fichier LICENSE créé
- [ ] Licence MIT choisie
- [ ] Copyright : Titouan 2026
- [ ] Référencé dans README.md

---

### US-11-06 : Déploiement sur GitHub Pages
**En tant que** utilisateur final
**Je veux** accéder à l'application en ligne
**Afin de** l'utiliser sans installation locale

**Critères d'acceptation :**
- [ ] GitHub Pages activé dans les settings
- [ ] Source : branche main
- [ ] URL : https://USERNAME.github.io/restaurants-halal-maghreb
- [ ] Application accessible et fonctionnelle
- [ ] LocalStorage fonctionne (pas de CORS)

---

## 🔮 Phase 12 : Améliorations Futures (Backlog)

### US-12-01 : Backend Node.js
**En tant que** développeur full-stack
**Je veux** créer un vrai backend
**Afin de** sécuriser les données et permettre le multi-device

**Critères d'acceptation :**
- [ ] API REST avec Express.js
- [ ] Base de données PostgreSQL ou MongoDB
- [ ] Authentification JWT
- [ ] Hashage des mots de passe avec bcrypt
- [ ] Validation côté serveur avec Joi

---

### US-12-02 : Envoi d'emails
**En tant que** restaurant
**Je veux** recevoir un email lors d'une nouvelle réservation
**Afin d'être notifié immédiatement

**Critères d'acceptation :**
- [ ] Service d'envoi configuré (SendGrid, Mailgun, Nodemailer)
- [ ] Email au restaurant lors de nouvelle réservation
- [ ] Email au client lors de confirmation/refus
- [ ] Templates HTML pour les emails

---

### US-12-03 : Système de paiement
**En tant que** restaurant
**Je veux** demander un acompte à la réservation
**Afin de** réduire les no-shows

**Critères d'acceptation :**
- [ ] Intégration Stripe ou PayPal
- [ ] Acompte de 10-20% du montant estimé
- [ ] Remboursement automatique en cas de refus
- [ ] Historique des transactions

---

### US-12-04 : Système de notation
**En tant que** client
**Je veux** noter et commenter les restaurants
**Afin de** partager mon expérience

**Critères d'acceptation :**
- [ ] Note sur 5 étoiles
- [ ] Commentaire texte
- [ ] Modération des avis
- [ ] Moyenne affichée sur les cartes de restaurants

---

### US-12-05 : Notifications push
**En tant que** client
**Je veux** recevoir une notification quand ma réservation est confirmée
**Afin d'être informé en temps réel

**Critères d'acceptation :**
- [ ] Service Worker pour notifications web
- [ ] Permission demandée à l'utilisateur
- [ ] Notification lors de changement de statut
- [ ] Fonctionne même si l'onglet est fermé

---

### US-12-06 : Géolocalisation
**En tant que** visiteur
**Je veux** voir les restaurants les plus proches de moi
**Afin de** trouver rapidement où manger

**Critères d'acceptation :**
- [ ] Permission de géolocalisation demandée
- [ ] Calcul de la distance en km
- [ ] Tri par distance
- [ ] Bouton "Restaurants près de moi"

---

### US-12-07 : Mode sombre
**En tant qu'** utilisateur
**Je veux** basculer en mode sombre
**Afin de** réduire la fatigue oculaire

**Critères d'acceptation :**
- [ ] Toggle dans le header
- [ ] Palette de couleurs sombres adaptée
- [ ] Préférence sauvegardée dans localStorage
- [ ] Détection automatique du thème système (prefers-color-scheme)

---

### US-12-08 : Application mobile native
**En tant qu'** utilisateur mobile
**Je veux** une app native
**Afin de** bénéficier d'une meilleure performance

**Critères d'acceptation :**
- [ ] Développement avec React Native ou Flutter
- [ ] Publication sur Play Store et App Store
- [ ] Synchronisation avec le backend
- [ ] Notifications push natives

---

### US-12-09 : Intégration réseaux sociaux
**En tant que** client
**Je veux** partager un restaurant sur Facebook
**Afin de** recommander à mes amis

**Critères d'acceptation :**
- [ ] Boutons de partage (Facebook, Twitter, WhatsApp)
- [ ] Open Graph meta tags pour preview
- [ ] Partage de réservations accomplies

---

### US-12-10 : Dashboard analytics restaurant
**En tant que** restaurant
**Je veux** voir des statistiques détaillées
**Afin d'optimiser ma gestion

**Critères d'acceptation :**
- [ ] Graphiques : réservations par jour/semaine/mois
- [ ] Taux de remplissage
- [ ] Heures de pointe
- [ ] Plats les plus commandés (si menu ajouté)
- [ ] Bibliothèque de graphiques : Chart.js ou D3.js

---

## 📊 Récapitulatif

| Phase | Nombre de User Stories | Priorité |
|-------|------------------------|----------|
| **Phase 0 : Conception & Analyse UML** | 10 | 🔴 Haute |
| **Phase 1 : Authentification** | 8 | 🔴 Haute |
| **Phase 2 : Carte Interactive** | 6 | 🔴 Haute |
| **Phase 3 : Système de Réservation** | 8 | 🔴 Haute |
| **Phase 4 : Gestion du Profil** | 4 | 🟠 Moyenne |
| **Phase 5 : Mes Réservations (Client)** | 4 | 🔴 Haute |
| **Phase 6 : Gestion Réservations (Restaurant)** | 6 | 🔴 Haute |
| **Phase 7 : Design Maghrébin** | 8 | 🟠 Moyenne |
| **Phase 8 : Responsive Design** | 4 | 🔴 Haute |
| **Phase 9 : Tests & Qualité** | 5 | 🟠 Moyenne |
| **Phase 10 : Documentation** | 4 | 🟠 Moyenne |
| **Phase 11 : Déploiement** | 6 | 🔴 Haute |
| **Phase 12 : Améliorations Futures** | 10 | 🟢 Basse |
| **TOTAL** | **83 User Stories** | |

---

## 🎯 Estimation de complexité (Story Points)

| Complexité | Story Points | Exemples |
|------------|--------------|----------|
| **XS - Très simple** | 1 | Bouton déconnexion, message d'erreur |
| **S - Simple** | 2-3 | Formulaire de connexion, statistiques |
| **M - Moyen** | 5-8 | Système de réservation, gestion du profil |
| **L - Complexe** | 13 | Carte interactive Leaflet, authentification complète |
| **XL - Très complexe** | 21+ | Backend complet, système de paiement |

### Total estimé pour le MVP (Phases 0-8) : **~200 Story Points**
### Total avec Documentation & Déploiement (Phases 0-11) : **~250 Story Points**

---

## 📅 Exemple de Sprint Planning

### Sprint 1 (2 semaines) : Fondations
- US-00-01 à US-00-10 : Conception UML
- US-01-01 à US-01-04 : Authentification de base

### Sprint 2 (2 semaines) : Carte et Restaurants
- US-02-01 à US-02-06 : Carte interactive Leaflet
- US-07-01 à US-07-03 : Premiers éléments de design

### Sprint 3 (2 semaines) : Réservation
- US-03-01 à US-03-08 : Système complet de réservation
- US-05-01 à US-05-04 : Page "Mes Réservations"

### Sprint 4 (2 semaines) : Gestion Restaurant & Design
- US-06-01 à US-06-06 : Dashboard restaurant
- US-07-04 à US-07-08 : Design maghrébin complet
- US-01-05, US-03-03 : Effets sonores

### Sprint 5 (1 semaine) : Profil & Responsive
- US-04-01 à US-04-04 : Gestion du profil
- US-08-01 à US-08-04 : Responsive design

### Sprint 6 (1 semaine) : Tests & Déploiement
- US-09-01 à US-09-05 : Tests et qualité
- US-10-01 à US-10-04 : Documentation
- US-11-01 à US-11-06 : Déploiement GitHub

**Durée totale estimée : 10 semaines (2,5 mois)**

---

## 🏆 Critères de "Definition of Done"

Une User Story est considérée comme terminée (Done) quand :

- [ ] Code écrit et fonctionnel
- [ ] Code commenté (si nécessaire)
- [ ] Tests unitaires passent (si applicable)
- [ ] Tests manuels effectués
- [ ] Responsive vérifié (mobile, tablette, desktop)
- [ ] Compatible navigateurs principaux (Chrome, Firefox, Safari, Edge)
- [ ] Accessible (WCAG 2.1 AA)
- [ ] Documenté dans README ou commentaires
- [ ] Validé par le Product Owner
- [ ] Mergé dans la branche main
- [ ] Déployé sur l'environnement de test/production

---

**السلام عليكم ورحمة الله وبركاته**

🇩🇿 الجزائر | 🇲🇦 المغرب | 🇹🇳 تونس
