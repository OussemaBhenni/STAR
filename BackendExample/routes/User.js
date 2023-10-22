const express = require('express');
const router = express.Router();
const userFunctions = require('../functions/User'); // Import user functions

// Register user
router.post('/register', userFunctions.registerUser);

// Login user
router.post('/login', userFunctions.loginUser);

// Get all users
router.get('/all', userFunctions.getAllUsers);

// update user
router.patch('/update', userFunctions.updateUser);


// Delete user
router.delete('/delete/:id', userFunctions.deleteUser);
/*router.patch('/forgetPassword', forgetPassword);
router.patch('/resetPassword', resetPassword);*/
// POST request - Send password reset link
router.post('/auth/forget-password', userFunctions.forgotPassword);

// POST request - Send password reset link
router.put('/auth/reset-password/:token', userFunctions.resetPassword);
module.exports = router;
