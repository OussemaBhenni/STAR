const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const sequelize = require('./database');


const app = express();
const coursRoutes = require('./routes/coursRoutes'); // Import the 'cours' routes
const leconRoutes = require('./routes/leconRoutes'); // Import the 'lecon' routes
const utilisateurRoutes = require('./routes/utilisateurRoutes');
const contactRoutes = require('./routes/contactRoutes');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database.');

  // Start the Express server
  const port = process.env.PORT || 3003;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});

sequelize.sync() // This ensures that the table is created if it does not exist
.then(() => {
  console.log('Sequelize model synchronized successfully.');
})
.catch((error) => {
  console.error('Error synchronizing Sequelize model:', error);
});



// Include the 'cours' and 'lecon' routes
app.use('/api', coursRoutes);
app.use('/api', leconRoutes);
app.use('/api', utilisateurRoutes);
app.use('/api', contactRoutes);


