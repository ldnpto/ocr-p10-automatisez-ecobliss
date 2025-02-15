# Installation du projet

# Guide d'Installation et Exécution des Tests

## Installation du projet

- **Clonez le dépôt :**  
    ```bash
    git clone https://github.com/ldnpto/ocr-p10-automatisez-ecobliss
    ```

- **Installez Docker :**  
    Téléchargez et installez [Docker](https://www.docker.com).

- **Démarrage du projet :**  
    Depuis un terminal ouvert dans le dossier du projet, lancez :
    ```bash
    docker-compose up --build
    ```
    
- **Accès au site :**  
    Ouvrez votre navigateur et allez à l'adresse : http://localhost:8080.

## Tests Cypress

- **Installez Node.js :**  
    Téléchargez et installez [Node.js](https://nodejs.org/en/download/package-manager/current).

- **Exécution des tests :**  
    Dans un terminal à la racine du projet, lancez :
    ```bash
    npx cypress run
    ```
    
- **Tests sur navigateur spécifique :**  
    Remplacez `<navigateur>` par Firefox, Chrome, Edge ou Electron, puis lancez :
    ```bash
    npx cypress run --browser <navigateur>
    ```

## Lancement des Tests

- **Affichage des Scripts Cypress :**  
    Choisir dans Cypress E2E testing, l'ouverture du navigateur affiche la liste des scripts disponibles.  
    ![Scripts Cypress](https://github.com/ldnpto/ocr-p10-automatisez-ecobliss/blob/977d37855b4402b80845a1cd8154431e4920585b/cypress/downloads/cypress-tests.png)

- **Test API /login :**  
    Exécution du test pour l'authentification.
    ![Test api /login](https://github.com/ldnpto/ocr-p10-automatisez-ecobliss/blob/977d37855b4402b80845a1cd8154431e4920585b/cypress/downloads/api-login.png)

- **Test API /orders :**  
    Exécution du test pour les commandes.  
    ![Test api /orders](https://github.com/ldnpto/ocr-p10-automatisez-ecobliss/blob/977d37855b4402b80845a1cd8154431e4920585b/cypress/downloads/api-orders.png)

- **Test API /products :**  
    Exécution du test pour la gestion des produits.  
    ![Test api /products](https://github.com/ldnpto/ocr-p10-automatisez-ecobliss/blob/977d37855b4402b80845a1cd8154431e4920585b/cypress/downloads/api-products.png)

- **Test API /reviews :**  
    Exécution du test pour les avis.  
    ![Test api /reviews](https://github.com/ldnpto/ocr-p10-automatisez-ecobliss/blob/977d37855b4402b80845a1cd8154431e4920585b/cypress/downloads/api-reviews.png)

- **Test UI login :**  
    Exécution du test de connexion via l'interface utilisateur.  
    ![Test ui login](https://github.com/ldnpto/ocr-p10-automatisez-ecobliss/blob/977d37855b4402b80845a1cd8154431e4920585b/cypress/downloads/ui-login.png)

- **Test UI orders :**  
    Exécution du test de gestion du panier via l'interface utilisateur.  
    ![Test ui orders](https://github.com/ldnpto/ocr-p10-automatisez-ecobliss/blob/977d37855b4402b80845a1cd8154431e4920585b/cypress/downloads/ui-panier.png)

- **Test UI smoke :**  
    Exécution du test global de fumée pour vérifier l'intégrité du système.  
    ![Test ui smoke](https://github.com/ldnpto/ocr-p10-automatisez-ecobliss/blob/977d37855b4402b80845a1cd8154431e4920585b/cypress/downloads/ui-smoke.png)