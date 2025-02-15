# Installation du projet

- Téléchargez ou clonez le dépôt avec la commande :
```
$ git clone https://github.com/ldnpto/ocr-p10-automatisez-ecobliss
```
- Téléchargez puis installez [Docker](https://www.docker.com)
- Depuis un terminal ouvert dans le dossier du projet, lancez la commande :
```
$ docker-compose up --build
```

- Ouvrez le site depuis la page : http://localhost:8080.

# Cypress

- Téléchargez puis installez [Node.js](https://nodejs.org/en/download/package-manager/current)
- Depuis un terminal ouvert dans le dossier du projet, lancez la commande :

```bash
$ npx cypress run
```
- Si vous souhaitez lancer les tests sur un navigateur en particulier, lancez la commande (en remplaçant <navigateur> par le navigateur de votre choix parmi Firefox, Chrome, Edge, Electron) :

```bash
$ npx cypress run --browser <navigateur>
```

- Une fois dans Cypress, la liste des scripts s'affiche et sont regroupées dans le repértoire "api" pour les tests d'intégration, et "ui" pour les tests fonctionnels. Il suffit de cliquer sur un script pour lancer l'exécution

![Scripts Cypress](https://github.com/ldnpto/ocr-p10-automatisez-ecobliss/blob/977d37855b4402b80845a1cd8154431e4920585b/cypress/downloads/cypress-tests.png)

Voici la liste des exécutions:

![Test api /login](https://github.com/ldnpto/ocr-p10-automatisez-ecobliss/blob/977d37855b4402b80845a1cd8154431e4920585b/cypress/downloads/api-login.png)

![Test api /orders](https://github.com/ldnpto/ocr-p10-automatisez-ecobliss/blob/977d37855b4402b80845a1cd8154431e4920585b/cypress/downloads/api-orders.png)

![Test api /products](https://github.com/ldnpto/ocr-p10-automatisez-ecobliss/blob/977d37855b4402b80845a1cd8154431e4920585b/cypress/downloads/api-products.png)

![Test api /reviews](https://github.com/ldnpto/ocr-p10-automatisez-ecobliss/blob/977d37855b4402b80845a1cd8154431e4920585b/cypress/downloads/api-reviews.png)

![Test ui login](https://github.com/ldnpto/ocr-p10-automatisez-ecobliss/blob/977d37855b4402b80845a1cd8154431e4920585b/cypress/downloads/ui-login.png)

![Test ui orders](https://github.com/ldnpto/ocr-p10-automatisez-ecobliss/blob/977d37855b4402b80845a1cd8154431e4920585b/cypress/downloads/ui-panier.png)

![Test ui smoke](https://github.com/ldnpto/ocr-p10-automatisez-ecobliss/blob/977d37855b4402b80845a1cd8154431e4920585b/cypress/downloads/ui-smoke.png)