const express = require('express');

const router = express.Router();

const questionControllers = require('../controllers/question');

router.get('/questions/:category', questionControllers.getQuestions);

module.exports = router;
