const mongoose = require('mongoose');

const { Schema } = mongoose;

const questionSchema = new Schema({
  question: {
    type: String,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  answers: {
    type: Array,
    require: true,
  },
  correctAnswer: {
    type: Number,
    require: true,
  },
});

module.exports = mongoose.model('Question', questionSchema);
