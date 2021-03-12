const express = require('express');

const router = express.Router();

const playersControllers = require('../controllers/player');

router.get('/players/:category', playersControllers.getPlayers);

router.post('/player', playersControllers.postPlayer);

module.exports = router;
