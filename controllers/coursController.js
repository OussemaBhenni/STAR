const Cours = require("../models/Cours"); // Import the 'cours' model
const path = require("path");
const fs = require("fs");
const { Sequelize, Op } = require("sequelize");

// Create a new 'cours'
async function createCours(req, res) {
  try {
    console.log("create");
    const cours = req.body;
    //     console.log("Cours Title:", cours.title);
    // console.log("Cours Description:", cours.description);
    // ... log other properties

    if (req.file) {
      const file = req.file;

      // Assuming you have a function to generate a random name for the file
      const randomFileName = generateRandomFileName(file.originalname);

      // Specify the path where you want to save the file
      const filePath = path.join(__dirname, "../imageDoc", randomFileName);
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
    courID = await Cours.create(cours);
    res
      .status(200)
      .json({ message: "Cours created successfully", idCours: courID.idCours });
    console.log("Cours ID:", courID);
    return 99;
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).json({ message: "Error creating course" });
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
    console.log(Cours, "ttt");
    const cours = await Cours.findAll(); // Note the 'await' here
    res.status(200).json(cours);
    return cours;
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Assuming you have imported your Sequelize model 'Cours' appropriately

async function getAllCoursByUserId(req, res) {
  try {
    const cours = await Cours.findAll({
      where: {
        createdBy: req.params.id,
      },
    });

    res.status(200).json(cours);
    return cours;
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Update an existing 'cours' by ID
async function updateCours(req, res) {
  console.log(req.body);
  try {
    let cours = await Cours.findByPk(req.body.idCours);
    if (!cours) {
      throw new Error("Cours not found");
    }

    let filePath; // Declare filePath outside the if block

    if (req.file) {
      const file = req.file;
      console.log("Uploaded file:", file);
      // Assuming you have a function to generate a random name for the file
      const randomFileName = generateRandomFileName(file.originalname);

      // Specify the path where you want to save the file
      filePath = path.join(__dirname, "../imageDoc", randomFileName);
      cours.image = filePath;
      
      console.log("File path:", filePath);

      // Save the file to the specified path
      try {
        // Asynchronous operation (e.g., file writing)
        await fs.promises.writeFile(filePath, file.buffer);
      } catch (error) {
        console.error("Error saving file:", error);
        res.status(500).json({ message: "Error saving file" });
        return;
      }
    }

    console.log("Before update - cours.image:", cours.image);
    cours = await cours.update(req.body);
    console.log("After update - cours.image:", cours.image);

    console.log({ idCours: cours.idCours, titre: cours.title });
    res.status(200).json({ idCours: cours.idCours, titre: cours.title });
    return cours;
  } catch (error) {
    res.status(500).json({ message: error.message + " here" });
  }
}

// Delete a 'cours' by ID
async function deleteCours(req, res) {
  try {
    const cours = await Cours.findByPk(req.params.id);
    if (!cours) {
      throw new Error("Cours not found");
    }

    // Destroy the course first
    await cours.destroy();

    // Send the response after the course has been successfully destroyed
    res.status(200).json({ message: "Cours deleted successfully" });
  } catch (error) {
    // Handle errors and send an appropriate response
    res.status(500).json({ message: error.message });
  }
}

//Find a 'cours' by ID
async function getCoursById(req, res) {
  try {
    const cours = await Cours.findByPk(req.params.id);
    if (!cours) {
      return res.status(404).json({ message: "Cours not found" });
    }
    res.status(200).json(cours);
    return cours;
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
//Find a 'cours' by ID
async function isMine(req, res) {
  try {
    const cours = await Cours.findByPk(req.params.idcours);
    if (!cours) {
      return res.status(404).json({ message: "Cours not found" });
    }
    r = cours.createdBy == req.params.id;
    res.status(200).json({ message: r });
    return cours;
  } catch (error) {
    res.status(500).json({ message: r });
  }
}
// Searsh a course
async function searchCoursByTitle(req, res) {
  try {
    console.log("Paramètre title:", req.params.title);
    const cours = await Cours.findAll({
      where: {
        titre: {
          [Op.like]: "%" + req.params.title + "%",
        },
      },
    });
    if (!cours || cours.length === 0) {
      return res.status(404).json({ message: "No matching cours found" });
    }

    res.status(200).json(cours);
    return cours;
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getAllCoursByUserId,
  isMine,
  createCours,
  getAllCours,
  updateCours,
  deleteCours,
  getCoursById,
  searchCoursByTitle,
};
