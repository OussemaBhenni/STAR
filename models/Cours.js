const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database'); // Import your database connection 

const Cours = sequelize.define('cours', {
  idCours: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  titre: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
  description: {
    type: DataTypes.TEXT,
  },
  duree: {
    type: DataTypes.INTEGER,
    defaultValue: null,
  },
  langue: {
    type: DataTypes.TEXT,
    defaultValue: null,
  },
  nbrDeVue: {
    type: DataTypes.INTEGER,
    defaultValue: null,
  },
  image: {
    type: DataTypes.TEXT,
    defaultValue: null,
  },
  createdBy: {
    type: DataTypes.STRING, // Adjust the data type based on your requirements
    defaultValue: null,
  },
  dateCreation: {
    type: DataTypes.DATE, // Adjust the data type based on your requirements
    defaultValue: Sequelize.fn('now'), // Set a default value using Sequelize.fn for the current timestamp
  },
}, {
  timestamps: false, // Disable timestamps
});

module.exports = Cours;
