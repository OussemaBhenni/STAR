const mongoose = require('mongoose');

const reclamationSchema = new mongoose.Schema({
  titre: String,
  description: String,
  dateSent: { type: Date, default: Date.now }
});

const Reclamation = mongoose.model('Reclamation', reclamationSchema);

module.exports = Reclamation;
