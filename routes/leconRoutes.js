const express = require('express');
const multer = require('multer');
const storage = multer.memoryStorage(); // or use diskStorage if you want to save to disk
const upload = multer({ storage: storage });
const leconController = require('../controllers/leconController');

const router = express.Router();

// Create a new 'lecon'
router.post('/lecon', upload.single('file'), leconController.createLecon);


// Get a list of all 'lecon'
router.get('/lecon', leconController.getAllLecon);

// Update an existing 'lecon' by ID
router.put('/lecon/:id', leconController.updateLecon);

// Delete a 'lecon' by ID
router.delete('/lecon/:id', leconController.deleteLecon);

//Get a list of all 'lecon' by cours
router.get('/cours/:id/lecons', leconController.getAllLeconByCours);

module.exports = router;
