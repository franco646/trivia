const Question = require('../models/question');

exports.getQuestions = async (req, res, next) => {
  const { category } = req.params;
  let limit;
  if (req.query) {
    limit = req.query.limit;
  }
  try {
    let questions = await Question.find({ category });
    if (!questions) {
      const error = new Error('No questions found');
      error.statusCode = 404;
      throw error;
    }
    if (!limit || limit > questions.length) {
      limit = questions.length;
    }
    questions = questions.sort(() => Math.random() - 0.5);
    questions.length = limit || questions.length;
    res.status(200).json({ questions });
    return questions;
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
    return error;
  }
};
