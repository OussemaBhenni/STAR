const Lecon = require("../models/Lecon"); // Import the 'lecon' model
const path = require("path");
const fs = require("fs");

// Create a new 'lecon'
async function createLecon(req, res) {
  try {

    const lecon = req.body;
    console.log(lecon);
    const ord = await findMaxOrdreForCours(lecon.idCours);
    lecon.ordre = ord == null ? 1 : ord + 1;
    //console.log(req.files);
    console.log(req.file);
    if (req.file) {
      const file = req.file;

      // Assuming you have a function to generate a random name for the file
      const randomFileName = generateRandomFileName(file.originalname);

      // Specify the path where you want to save the file
      const filePath = path.join(__dirname, "../imageDoc", randomFileName);
      lecon.contenu = filePath;
      // Save the file to the specified path
      fs.writeFileSync(filePath, file.buffer);
    }

    await Lecon.create(lecon);

    res.json({ message: "Lecon created successfully", lecon });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
// Update an existing 'lecon' by ID
async function updateLecon(req, res) {
  try {
    const lecon = await Lecon.findByPk(req.params.id);
    if (!lecon) {
      res.status(404).json({ error: "Lecon not found" });
      return;
    }
    if (req.file) {
      const file = req.file;
      console.log(file);
      // Assuming you have a function to generate a random name for the file
      const randomFileName = generateRandomFileName(file.originalname);

      // Specify the path where you want to save the file
      const filePath = path.join(__dirname, "../imageDoc", randomFileName);
      lecon.contenu = filePath;
      // Save the file to the specified path
      fs.writeFileSync  (filePath, file.buffer);
    }
    await lecon.update(req.body);
    res.status(200).json(lecon);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

function generateRandomFileName(originalFileName) {
  const fileExtension = path.extname(originalFileName);
  const randomString = Math.random().toString(36).substring(7);
  return `${randomString}${fileExtension}`;
}

async function findMaxOrdreForCours(idCours) {
  try {
    const maxOrdre = await Lecon.max("ordre", {
      where: { idCours },
    });
    return maxOrdre;
  } catch (error) {
    throw new Error(`Error finding max ordre: ${error.message}`);
  }
}

// Get a list of all 'lecon'
async function getAllLecon(req, res) {
  try {
    const lecon = await Lecon.findAll();
    res.status(200).json(lecon);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


// Delete a 'lecon' by ID
async function deleteLecon(req, res) {
  try {
    const lecon = await Lecon.findByPk(req.params.id);
    if (!lecon) {
      res.status(404).json({ error: "Lecon not found" });
      return;
    }

    await lecon.destroy();
    res.json({ message: "Lecon deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get Lecon by IDCOURS
async function getAllLeconByCours(req, res) {
  try {
    const lecons = await Lecon.findAll({ where: { IdCours: req.params.id } });
    console.log(lecons);
    res.status(200).json(lecons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
async function getLeconById(req, res) {
  try {
    const lecon = await Lecon.findOne({
      where: {
        idCours: req.params.coursId,
        idLecon: req.params.leconId
      }
    });
    if (!lecon) {
      return res.status(404).json({ error: 'Lecon not found' });
    }

    res.status(200).json(lecon);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createLecon,
  getAllLecon,
  updateLecon,
  deleteLecon,
  getAllLeconByCours,
  getLeconById
};
