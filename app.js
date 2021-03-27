require('dotenv').config({ path: `${__dirname}/.env` });

const express = require('express');
const bodyParser = require('body-parser');

const playersRoutes = require('./routes/player');
const questionsRoutes = require('./routes/question');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(bodyParser.json());

app.get('/', (_req, res, next) => {
  res.status(200).end();
  next();
});

app.use(playersRoutes);
app.use(questionsRoutes);

// eslint-disable-next-line no-unused-vars
app.use((error, _req, res, _next) => {
  const statusError = error.statusCode || 500;
  const { message } = error;
  res.status(statusError).json({ message });
});

module.exports = app;
