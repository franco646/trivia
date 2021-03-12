const mongoose = require('mongoose');

const { Schema } = mongoose;

const playerSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  correctAnswers: {
    type: Number,
    require: true,
  },
});

module.exports = mongoose.model('Player', playerSchema);
