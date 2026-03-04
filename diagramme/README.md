# Diagrammes de séquence - Application Restaurants Halal

Ce dossier contient tous les diagrammes de séquence PlantUML pour l'application de réservation de restaurants halal.

## Diagrammes d'authentification

### 1. `sequences-authentification.puml` - Inscription
- **Acteurs** : Utilisateur, Interface Web, AuthService, API Backend, Base de données, SessionManager
- **Scénario** : Inscription d'un nouveau client ou restaurant
- **Cas d'erreur** :
  - Champs invalides
  - Email déjà existant
- **Résultat** : Création du compte + connexion automatique + redirection

### 2. `sequences-connexion.puml` - Connexion
- **Acteurs** : Utilisateur, Interface Web, AuthService, API Backend, Base de données, SessionManager
- **Scénario** : Connexion d'un utilisateur existant
- **Cas d'erreur** :
  - Champs vides
  - Email non trouvé
  - Mot de passe incorrect
- **Options** : Se souvenir de moi (localStorage vs sessionStorage)
- **Résultat** : Session créée + son de bienvenue + redirection

### 3. `sequences-deconnexion.puml` - Déconnexion
- **Acteurs** : Utilisateur, Interface Web, SessionManager
- **Scénario** : Déconnexion de l'utilisateur
- **Résultat** : Suppression de la session + rechargement de la page

### 4. `sequences-modification-profil.puml` - Modification du profil
- **Acteurs** : Utilisateur, Interface Web, SessionManager, API Backend, Base de données
- **Scénario** : Modification du nom, email et/ou mot de passe
- **Cas d'erreur** :
  - Utilisateur non connecté
  - Utilisateur non trouvé
  - Mot de passe actuel manquant
  - Mot de passe actuel incorrect
- **Résultat** : Profil mis à jour

### 5. `sequences-suppression-compte.puml` - Suppression du compte
- **Acteurs** : Utilisateur, Interface Web, SessionManager, API Backend, Base de données
- **Scénario** : Suppression définitive du compte utilisateur
- **Sécurité** : Confirmation demandée
- **Résultat** : Compte supprimé + déconnexion + redirection

## Diagrammes de gestion des réservations

### 6. `sequences-creation-reservation.puml` - Création d'une réservation
- **Acteurs** : Client, Interface Web, SessionManager, API Backend, Base de données
- **Scénario** : Création d'une nouvelle réservation
- **Cas d'erreur** :
  - Utilisateur non connecté (redirection vers auth.html)
  - Type de service non sélectionné
  - Champs obligatoires manquants
- **Résultat** : Réservation créée avec statut "pending" + redirection vers mes réservations

### 7. `sequences-annulation-reservation.puml` - Annulation par le client
- **Acteurs** : Client, Interface Web, SessionManager, API Backend, Base de données
- **Scénario** : Annulation d'une réservation par le client
- **Sécurité** : Confirmation demandée
- **Résultat** : Statut changé en "cancelled" + liste actualisée

### 8. `sequences-gestion-reservation-restaurant.puml` - Acceptation par le restaurant
- **Acteurs** : Restaurateur, Interface Web, SessionManager, API Backend, Base de données
- **Scénario** : Acceptation d'une réservation par le restaurant
- **Contrôles d'accès** :
  - Utilisateur doit être connecté
  - Utilisateur doit avoir le rôle "restaurant"
  - Utilisateur doit avoir un restaurantId associé
- **Sécurité** : Confirmation demandée
- **Résultat** : Statut changé en "confirmed" + liste actualisée

### 9. `sequences-refus-reservation-restaurant.puml` - Refus par le restaurant
- **Acteurs** : Restaurateur, Interface Web, SessionManager, API Backend, Base de données
- **Scénario** : Refus d'une réservation par le restaurant
- **Sécurité** : Confirmation demandée
- **Résultat** : Statut changé en "refused" + liste actualisée

## Comment générer les images

### Avec PlantUML en ligne de commande
```bash
# Installer PlantUML
sudo apt-get install plantuml

# Générer toutes les images
plantuml diagramme/*.puml

# Générer une image spécifique
plantuml diagramme/sequences-connexion.puml
```

### Avec l'extension VS Code
1. Installer l'extension "PlantUML"
2. Ouvrir un fichier .puml
3. Appuyer sur Alt+D pour prévisualiser

### En ligne
Copier-coller le contenu sur : https://www.plantuml.com/plantuml/uml/

## Statuts des réservations

- **pending** : En attente de validation par le restaurant
- **confirmed** : Acceptée par le restaurant
- **refused** : Refusée par le restaurant
- **cancelled** : Annulée par le client

## Architecture de sécurité

### Hashage des mots de passe
- Utilisation de `bcrypt` avec un coût de 10
- Les mots de passe ne sont jamais stockés en clair
- Comparaison sécurisée avec `bcrypt.compare()`

### Gestion des sessions
- **localStorage** : Session persistante (si "Se souvenir de moi")
- **sessionStorage** : Session temporaire (fermée à la fermeture du navigateur)
- Contenu de la session : `{userId, userName, userEmail, userRole, restaurantId, isLoggedIn, loginTime}`

### Contrôles d'accès
- Pages client : vérification du rôle "client"
- Pages restaurant : vérification du rôle "restaurant" + restaurantId
- API : validation des données côté serveur
