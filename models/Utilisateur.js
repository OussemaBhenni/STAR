const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database'); // Import your database connection 

const Utilisateur = sequelize.define('utilisateur', {
  idUtilisateur: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nom_prenom: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
  adresse: {
    type: DataTypes.TEXT,
    defaultValue: null,
  },
  photo: {
    type: DataTypes.TEXT,
    defaultValue: null,
  },
  grade: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
  email: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
  mdp: {
    type: DataTypes.TEXT,
    defaultValue: null,
  },
  resetPasswordToken: {
    type: DataTypes.STRING,
    defaultValue: null,
  },

  resetPasswordExpires: {
    type: DataTypes.DATE,
    defaultValue: null,
  },dateCreation: {
    type: DataTypes.DATE, // Adjust the data type based on your requirements
    defaultValue: Sequelize.fn('now'), // Set a default value using Sequelize.fn for the current timestamp
  },
  
  
}, {
  tableName: 'utilisateur',
  timestamps: false, // Disable timestamps
});

module.exports = Utilisateur;
