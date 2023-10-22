const express = require('express');
const cors = require('cors');
const  Sequelize  = require('sequelize');
 // Import the Sequelize instance from database.js
const Cours = require('./models/Cours');
const Lecon = require('./models/Lecon');
const coursRoutes = require('./routes/coursRoutes'); // Import the 'cours' routes
const leconRoutes = require('./routes/leconRoutes'); // Import the 'lecon' routes

const app = express();

// Enable CORS
app.use(cors());
const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  dialect: 'mysql', // or your preferred database dialect
});

sequelize
  .sync() // Synchronize the models with the database
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error synchronizing models with the database:', error);
  });
// Synchronize the models with the database
Cours.init(sequelize);
Lecon.init(sequelize);

// Define the relationship between 'cours' and 'lecon'
Cours.hasMany(Lecon, { foreignKey: 'idcours' });
Lecon.belongsTo(Cours, { foreignKey: 'idcours' });

// Include the 'cours' and 'lecon' routes
app.use('/api', coursRoutes);
app.use('/api', leconRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
