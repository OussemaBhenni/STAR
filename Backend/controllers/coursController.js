const Cours = require('../models/Cours'); // Import the 'cours' model

// Create a new 'cours'
async function createCours(req, res) {
  try {
    const cours = req.body ;
    res.status(200).json(await Cours.create(cours));
    return cours;
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Get a list of all 'cours'
async function getAllCours(req, res) {
  try {
    console.log("here");
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
