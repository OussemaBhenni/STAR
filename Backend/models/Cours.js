const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database'); // Import your database connection this give erore

const Cours = sequelize.define('cours', {
  idCours: {
    type: DataTypes.INTEGER,
    allowNull: false,
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
  nbrDeVue: {
    type: DataTypes.INTEGER,
    defaultValue: null,
  },
});

module.exports = Cours;
