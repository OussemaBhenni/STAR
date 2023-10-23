const Cours = require('../models/Cours'); // Import the 'cours' model

// Create a new 'cours'
async function createCours(data) {
  try {
    const cours = await Cours.create(data);
    return cours;
  } catch (error) {
    throw error;
  }
}

// Get a list of all 'cours'
async function getAllCours() {
  try {
    console.log("here");
    const cours = await Cours.findAll(); // Note the 'await' here
    console.log(cours);
    return cours;
  } catch (error) {
    throw error;
  }
}


// Update an existing 'cours' by ID
async function updateCours(id, data) {
  try {
    const cours = await Cours.findByPk(id);
    if (!cours) {
      throw new Error('Cours not found');
    }
    await cours.update(data);
    return cours;
  } catch (error) {
    throw error;
  }
}

// Delete a 'cours' by ID
async function deleteCours(id) {
  try {
    const cours = await Cours.findByPk(id);
    if (!cours) {
      throw new Error('Cours not found');
    }
    await cours.destroy();
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createCours,
  getAllCours,
  updateCours,
  deleteCours,
};
