# Trivia

Juego de preguntas y respuestas creado con React y Node.js

## Introducción 🚀

_Puede ver una demostración en vivo de esta aplicación en el siguiente link:._

https://trivia-franco.herokuapp.com/

### Instalación y ejecución 🔧

_Para correr la aplicación de manera local siga las instrucciones._

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
_Por defecto la aplicación corre en:_
```
http://localhost:3000/
```


## Construido con 🛠️

##### Backend:
* [Express](https://expressjs.com/es/) - Framework para Node.js
* [Mongoose](https://mongoosejs.com/) - ORM
* [MongoDB](https://www.mongodb.com/) - Base de datos
* [Body-parser](https://www.npmjs.com/package/body-parser) - Parsing middleware
* [mongodb-memory-server](https://github.com/nodkz/mongodb-memory-server) - Base de datos local para tests
##### Frontend:
* [Bulma.io](https://bulma.io/) - Libreria de css
* [Node-sass](https://www.npmjs.com/package/node-sass) - Compilador de archivos .scss
* [prop-types](https://www.npmjs.com/package/prop-types) - Verificacion de tipos en tiempo real

## Tests ⚙️
### Los test fueron construidos con
##### Backend:
* [Mocha](https://mochajs.org/)
* [Chai](https://www.chaijs.com/)
* [Sinon](https://sinonjs.org/)
##### frontend:
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