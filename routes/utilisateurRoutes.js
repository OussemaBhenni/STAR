const express = require('express');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const utilisateurController = require('../controllers/utilisateurController');

const router = express.Router();

// Register a new user
router.post('/register', utilisateurController.registerUser);

// Login user
router.post('/login', utilisateurController.loginUser);

// Get a list of all users
router.get('/users', utilisateurController.getAllUsers);

// Update an existing user by ID
router.put('/users/:id', utilisateurController.updateUser);

// Delete a user by ID
router.delete('/users/:id', utilisateurController.deleteUser);

// Forgot Password
router.post('/forgot-password', utilisateurController.forgotPassword);

// Reset Password
router.post('/reset-password/:token', utilisateurController.resetPassword);

router.get('/check-reset-token/:token', utilisateurController.checkResetToken);
router.get('/getUser/:email', utilisateurController.findUserByEmail);
module.exports = router;
