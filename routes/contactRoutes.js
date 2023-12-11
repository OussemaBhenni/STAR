const express = require('express');

const contactController = require('../controllers/contactController');

const router = express.Router();

// Create a new 'cours'
router.post('/contact',  contactController.createContact);

// Get a list of all 'cours'
router.get('/contact', contactController.getAllContacts);

// Update an existing 'cours' by ID
router.put('/contact/:id', contactController.updateContact);

// Delete a 'cours' by ID
router.delete('/contact/:id', contactController.deleteContact);






module.exports = router;
