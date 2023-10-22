const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Import your database connection

const Lecon = sequelize.define('lecon', {
  idLecon: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  titre: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.TEXT,
  },
  contenu: {
    type: DataTypes.TEXT,
  },
  duree: {
    type: DataTypes.INTEGER,
  },
});

module.exports = Lecon;
