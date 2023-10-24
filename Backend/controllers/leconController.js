const Lecon = require('../models/Lecon'); // Import the 'lecon' model

// Create a new 'lecon'
async function createLecon(req, res) {
  try {
    const lecon = req.body ;
    const ord =await findMaxOrdreForCours(lecon.idCours);
    lecon.ordre = ord == 1 ? 1:ord+1;
    console.log(ord);
    await Lecon.create(lecon);
    res.json(lecon);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function findMaxOrdreForCours(idCours) {
  try {
    const maxOrdre = await Lecon.max('ordre', {
      where: { idCours },
    }) ;
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

// Update an existing 'lecon' by ID
async function updateLecon(req, res) {
  try {
    const lecon = await Lecon.findByPk(req.params.id);
    if (!lecon) {
      res.status(404).json({ error: 'Lecon not found' });
      return;
    }

    await lecon.update(req.body);
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
      res.status(404).json({ error: 'Lecon not found' });
      return;
    }

    await lecon.destroy();
    res.json({ message: 'Lecon deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createLecon,
  getAllLecon,
  updateLecon,
  deleteLecon,
};
