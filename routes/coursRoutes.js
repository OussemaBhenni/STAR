const express = require('express');
const multer = require('multer');
//const { Sequelize } = require('sequelize');

const storage = multer.memoryStorage(); // or use diskStorage if you want to save to disk
const upload = multer({ storage: storage });
const coursController = require('../controllers/coursController');

const router = express.Router();

// Create a new 'cours'
router.post('/cours', upload.single('file'), coursController.createCours);

// Get a list of all 'cours'
router.get('/cours', coursController.getAllCours);

// Update an existing 'cours' by ID
router.put('/cours/:id', coursController.updateCours);

// Delete a 'cours' by ID
router.delete('/cours/:id', coursController.deleteCours);

// Get a 'cours' by ID
router.get('/cours/:id', coursController.getCoursById);

//search Cours by name
router.get('/cours/search/:title', coursController.searchCoursByTitle);


module.exports = router;
