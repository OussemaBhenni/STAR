const express = require('express');
const dotenv = require('dotenv');
const { Sequelize } = require('sequelize');
const cors = require('cors');
const Cours = require('./models/Cours'); // Import the 'cours' model
const Lecon = require('./models/Lecon'); // Import the 'lecon' model

// Load environment variables from .env file
dotenv.config();

// Create an instance of Express
const app = express();

// Enable CORS
app.use(cors());

// Create a Sequelize instance with the database connection details
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});

// Define the relationship between 'cours' and 'lecon'
Cours.hasMany(Lecon, { foreignKey: 'idcours' });
Lecon.belongsTo(Cours, { foreignKey: 'idcours' });

// Synchronize the models with the database
sequelize.sync();

// Your routes and application logic can go here

// Start the Express server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
