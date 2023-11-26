const Cours = require('../models/Cours'); // Import the 'cours' model
const path = require("path");
const fs = require("fs");


// Create a new 'cours'
async function createCours(req, res) {
  try {
    console.log("create");
    const cours = req.body ;
//     console.log("Cours Title:", cours.title);
// console.log("Cours Description:", cours.description);
// ... log other properties

    if (req.file) { 
      const file = req.file;

      // Assuming you have a function to generate a random name for the file
      const randomFileName = generateRandomFileName(file.originalname);

      // Specify the path where you want to save the file
      const filePath = path.join(__dirname, "../images", randomFileName);
      cours.image = filePath;
      // Save the file to the specified path
      try {
        // Save the file to the specified path
        fs.writeFileSync(filePath, file.buffer);
      } catch (error) {
        // Handle the error (log it, send an appropriate response, etc.)
        console.error("Error saving file:", error);
        res.status(500).json({ message: "Error saving file" });
        return;
      }
      
    }
    courID =await Cours.create(cours);
    res.status(200).json(courID);
    console.log("Cours ID:", courID);
    return 99;
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).json({ message: "Error creating course", error: error.message });
  }
  
}
function generateRandomFileName(originalFileName) {
  const fileExtension = path.extname(originalFileName);
  const randomString = Math.random().toString(36).substring(7);
  return `${randomString}${fileExtension}`;
}

// Get a list of all 'cours'
async function getAllCours(req, res) {
  try {
    console.log(Cours,"ttt");
    const cours = await Cours.findAll(); // Note the 'await' here
    res.status(200).json(cours);
    return cours;
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


// Update an existing 'cours' by ID
async function updateCours(req, res) {
  try {
    const cours = await Cours.findByPk(req.body.idCours);
    if (!cours) {
      throw new Error('Cours not found');
    }
    await cours.update(req.body);
    res.status(200).json(cours);
    return cours;
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Delete a 'cours' by ID
async function deleteCours(req, res) {
  try {
    const cours = await Cours.findByPk(req.params.id);
    if (!cours) {
      throw new Error('Cours not found');
    }
    res.status(200).json(cours);
    await cours.destroy();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  createCours,
  getAllCours,
  updateCours,
  deleteCours,
};
