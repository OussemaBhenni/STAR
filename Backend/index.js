const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json()); // Middleware to parse JSON data in requests

// Connect to MongoDB
mongoose.connect('mongodb+srv://oussemabenhenni:123546001@cluster0.fcs3fo5.mongodb.net/Spiraw', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB', err));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// Import the admin routes
const adminRoutes = require('./routes/Admin');
app.use('/admin', adminRoutes); // Mount admin routes under '/admin
// Import the user routes
const userRoutes = require('./routes/User');
app.use('/', userRoutes); // Mount user routes under '/user