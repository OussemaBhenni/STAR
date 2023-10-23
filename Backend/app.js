const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const coursRoutes = require('./routes/coursRoutes'); // Import the 'cours' routes
const leconRoutes = require('./routes/leconRoutes'); // Import the 'lecon' routes


app.use(cors());
app.use(express.json());

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



// Include the 'cours' and 'lecon' routes
app.use('/api', coursRoutes);
app.use('/api', leconRoutes);



