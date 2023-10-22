const express = require('express');
const router = express.Router();
const adminFunctions = require('../functions/Admin'); // Import admin functions

// Register admin
router.post('/register', adminFunctions.registerAdmin);

// Login admin
router.post('/login', adminFunctions.loginAdmin);

// Get all admins
router.get('/all', adminFunctions.getAllAdmins);
// update admin
router.patch('/update', adminFunctions.updateAdmin);
// Get admin by id
router.get('/getAdmin', adminFunctions.findAdminById);

// Delete admin
router.delete('/delete/:adminId', async (req, res) => {
    try {
      const adminId = req.params.adminId;
  
      const deletedAdmin = await adminFunctions.deleteAdminById(adminId);
      if (deletedAdmin.deletedCount === 0) {
        return res.status(404).json({ error: 'Admin not found' });
      }
  
      res.status(200).json({ message: 'Admin deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  });
  //get reclamations
  router.get('/reclamations', adminFunctions.getAllReclamations);
//create reclamation
router.post('/reclamations', adminFunctions.createReclamation);
//update reclamation
router.put('/reclamations', adminFunctions.updateReclamation);
//delete reclamation
router.delete('/reclamations/:id', adminFunctions.deleteReclamation);

  
  
  
  
  
  







module.exports = router;
