const  Contact  = require('../models/Contact'); // Import the 'Contact' model

// Create a new contact
async function createContact(req, res) {
  try {
    const contactData = req.body;
    console.log(contactData);
    const contact = await Contact.create(contactData);
    res.status(201).json(contact);
  } catch (error) {
    console.error("Error creating contact:", error);
    res.status(500).json({ message: "Error creating contact", error: error.message });
  }
}

// Get a list of all contacts
async function getAllContacts(req, res) {
  try {
    const contacts = await Contact.findAll();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Update an existing contact by ID
async function updateContact(req, res) {
  try {
    const contactId = req.params.id;
    const updatedData = req.body;
    const contact = await Contact.findByPk(contactId);

    if (!contact) {
      throw new Error('Contact not found');
    }

    await contact.update(updatedData);
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Delete a contact by ID
async function deleteContact(req, res) {
  try {
    const contactId = req.params.id;
    const contact = await Contact.findByPk(contactId);

    if (!contact) {
      throw new Error('Contact not found');
    }

    await contact.destroy();
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Find a contact by ID
async function getContactById(req, res) {
  try {
    const contactId = req.params.id;
    const contact = await Contact.findByPk(contactId);

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  createContact,
  getAllContacts,
  updateContact,
  deleteContact,
  getContactById,
};
