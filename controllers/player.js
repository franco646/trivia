const Player = require('../models/player');

exports.getPlayers = async (req, res, next) => {
  const { category } = req.params;
  try {
    const players = await Player.find({ category });
    if (!players) {
      const error = new Error('No players found');
      error.statusCode = 404;
      throw error;
    }
    return res.status(200).json({ players }).end();
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
    return error;
  }
};

exports.postPlayer = async (req, res, next) => {
  const {
    name,
    correctAnswers,
    category,
  } = req.body;

  try {
    const player = await Player.create({
      name,
      correctAnswers,
      category,
    });
    return res.status(200).json({ player }).end();
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
    return error;
  }
};
