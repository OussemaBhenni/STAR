// userController.test.js

const { expect } = require('chai');
const sinon = require('sinon');
const bcrypt = require('bcrypt');
const Utilisateur = require('../models/Utilisateur');
const userController = require('../controllers/utilisateurController');

describe('User Controller Tests', () => {
  describe('registerUser', () => {
    it('should register a new user', async () => {
      // Mocking Utilisateur model's create method
      const createStub = sinon.stub(Utilisateur, 'create');
      createStub.resolves({
        idUtilisateur: 1,
        nom_prenom: 'John Doe',
        adresse: '123 Main St',
        photo: 'profile.jpg',
        grade: 'Engineer',
        role: 'User',
        email: 'john.doe@example.com',
        mdp: await bcrypt.hash('password123', 10),
        createdBy: 'Admin',
      });

      // Mocking request and response objects
      const req = {
        body: {
          nom_prenom: 'John Doe',
          adresse: '123 Main St',
          photo: 'profile.jpg',
          grade: 'Engineer',
          role: 'User',
          email: 'john.doe@example.com',
          mdp: 'password123',
          createdBy: 'Admin',
        },
      };
      const res = { status: sinon.stub(), json: sinon.stub() };
      res.status.returnsThis(); // Enable chaining

      // Execute the function
      await userController.registerUser(req, res);

      // Assertions
      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWithMatch({ message: 'Utilisateur registered successfully', userId: 1 })).to.be.true;

      // Restore the original Utilisateur.create method
      createStub.restore();
    });

    // Add more test cases for registerUser as needed
  });

  // Add additional describe blocks for other functions
});
