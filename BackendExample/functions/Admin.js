const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Reclamation = require('../models/Reclamation');
async function registerAdmin(req, res) {
  try {
    const { nom, prenom, cin, email, password, num_tel, role } = req.body;
    // Validate password: at least 8 characters, 1 uppercase letter, 1 digit
   /* const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,14}$/;
    if (!password.match(passwordRegex)) {
      return res.status(400).json({ error: 'Invalid password format' });
    }*/
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      nom,
      prenom,
      cin,
      email,
      password: hashedPassword,
      num_tel,
      role,
    });

    await newAdmin.save();

    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
}

async function loginAdmin(req, res) {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      console.log(req.body);
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ adminId: admin._id }, 'secret_key', { expiresIn: '1h' });

    res.json({ admin: { email: admin.email, role: admin.role }, token });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
}

async function getAllAdmins(req, res) {
  try {
    const admins = await Admin.find();
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


async function findAdminById(adminId) {
  try {
    const admin = await Admin.findById(adminId);
    return admin;
  } catch (error) {
    throw error;
  }
}

async function updateAdmin(req, res) {
  try {
    const adminId = req.body._id; // Admin ID
    const adminFieldsToUpdate = {
      nom: req.body.nom,
      prenom: req.body.prenom,
      cin: req.body.cin,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    };

    const updatedAdmin = await Admin.findOneAndUpdate(
      { _id: adminId },
      { $set: adminFieldsToUpdate },
      { new: true } // Return the updated document
    );

    if (!updatedAdmin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    res.status(200).json(updatedAdmin);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
}


async function deleteAdminById(adminId) {
  try {
    const deletedAdmin = await Admin.deleteOne({ _id: adminId });
    return deletedAdmin;
  } catch (error) {
    throw error;
  }
}

async function getAllReclamations(req, res) {
  try {
    const reclamations = await Reclamation.find();
    res.status(200).json(reclamations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function createReclamation(req, res) {
  const { titre, description } = req.body;

  try {
    const newReclamation = await Reclamation.create({ titre, description });
    res.status(201).json(newReclamation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateReclamation(req, res) {
  try {
    const Id = req.body._id; 
    const recFieldsToUpdate = {
      titr: req.body.titre,
      description: req.body.description
    };

    const updatedRec = await Reclamation.findOneAndUpdate(
      { _id:Id },
      { $set: recFieldsToUpdate },
      { new: true } // Return the updated document
    );

    if (!updatedRec) {
      return res.status(404).json({ error: 'reclamation not found' });
    }

    res.status(200).json(updatedRec);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
}






function deleteReclamation(req, res) {
  const id = req.params.id; // Assuming you're sending the user ID in the request body
  console.log(id);
  Reclamation.findByIdAndRemove(id)
    .exec()
    .then((result) => {
      if (!result) {
      
        return res.status(404).json({ error: 'Reclamation not found' });
      }
      return res.status(200).json("Reclamation deleted successfully");
    })
    .catch((error) => {
      // Handle the error gracefully
      console.error('An error occurred:', error);
      return res.status(500).json({ error: 'An error occurred while processing your request' });
    });
}


module.exports = { registerAdmin, loginAdmin, getAllAdmins ,findAdminById, updateAdmin ,deleteAdminById,  createReclamation,
  getAllReclamations,
  updateReclamation,
  deleteReclamation};
