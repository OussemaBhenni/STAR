const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database'); // Import your database connection 

const Contact = sequelize.define('contact', {
  idContact: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  subject: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
  message: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
  email: {
    type: DataTypes.STRING,
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
  tableName: 'contact',
  timestamps: false, // Disable timestamps
});

module.exports = Contact;
