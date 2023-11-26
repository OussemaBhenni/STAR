const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database'); // Import your database connection

const Lecon = sequelize.define('lecon', {
  idLecon: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  ordre: {
    type: DataTypes.INTEGER,
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
  idCours: {
    type: DataTypes.INTEGER,
    foreignKey: true,
  },
}, {
  tableName: 'lecon',
  timestamps: false, // Disable timestamps
});




module.exports = Lecon;
