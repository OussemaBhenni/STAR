const express = require('express');
const coursController = require('../controllers/coursController');

const router = express.Router();

// Create a new 'cours'
router.post('/cours', coursController.createCours);

// Get a list of all 'cours'
router.get('/cours', coursController.getAllCours);

// Update an existing 'cours' by ID
router.put('/cours/:id', coursController.updateCours);

// Delete a 'cours' by ID
router.delete('/cours/:id', coursController.deleteCours);

module.exports = router;
