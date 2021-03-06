# Trivia

Juego de preguntas y respuestas creado con React y Node.js

## Introducci贸n 馃殌

_Puede ver una demostraci贸n en vivo de esta aplicaci贸n en el siguiente link:._

https://trivia-franco.herokuapp.com/

### Instalaci贸n y ejecuci贸n 馃敡

_Para correr la aplicaci贸n de manera local siga las instrucciones._

#### 1. Instalar dependencias.
##### Backend:
```
npm install
```
##### Frontend:
```
npm install --prefix client
```
#### 2. Correr el proyecto.
##### Backend:
```
npm run start:dev
```
##### Frontend:
```
npm run start --prefix client
```
#### 3. Abrir proyecto  en el navegador.
_Por defecto la aplicaci贸n corre en:_
```
http://localhost:3000/
```


## Construido con 馃洜锔?

##### Backend:
* [Express](https://expressjs.com/es/) - Framework para Node.js
* [Mongoose](https://mongoosejs.com/) - ORM
* [MongoDB](https://www.mongodb.com/) - Base de datos
* [Body-parser](https://www.npmjs.com/package/body-parser) - Parsing middleware
* [mongodb-memory-server](https://github.com/nodkz/mongodb-memory-server) - Base de datos local para tests
##### Frontend:
* [Bulma.io](https://bulma.io/) - Librer铆a de css
* [Node-sass](https://www.npmjs.com/package/node-sass) - Compilador de archivos .scss
* [prop-types](https://www.npmjs.com/package/prop-types) - Verificaci贸n de tipos en tiempo real

## Tests 鈿欙笍
### Los test fueron construidos con
##### Backend:
* [Mocha](https://mochajs.org/)
* [Chai](https://www.chaijs.com/)
* [Sinon](https://sinonjs.org/)
##### Frontend:
* [Jest](https://jestjs.io/)
* [React Testing Library](https://testing-library.com/)

### Correr test
##### Backend:
```
npm run ci
```
##### Frontend:
```
npm run test --prefix client
```