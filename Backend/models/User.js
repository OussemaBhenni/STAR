const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    nom: String,
    prenom: String,
    pays: String,
    region: String,
    code_postal: String,
    email: String,
    mdp: String,
    num_tel: String,
    sexe: String,
    age: Number,
    resetPasswordToken: String,
    resetPasswordExpires: Date, 
  });
  
  // Create a model from the schema
  const User = mongoose.model('User', schema);
  
  module.exports = User;