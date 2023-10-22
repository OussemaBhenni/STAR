const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nom: String,
  prenom: String,
  cin:Number,
  email: String,
  password: String,
  num_tel: Number,
  role: String
});

module.exports = mongoose.model('Admin', userSchema);
