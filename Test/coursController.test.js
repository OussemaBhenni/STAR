const { expect } = require('chai');
const sinon = require('sinon');
const fs = require('fs');
const Cours = require('../models/Cours');
const coursController = require('../controllers/coursController');

describe('Cours Controller Tests', () => {
  describe('createCours', () => {
    it('should create a new cours', async () => {
      const createStub = sinon.stub(Cours, 'create');
      createStub.resolves({
        idCours: 1,
        titre: 'New Course',
        description: 'This is a test course',
        duree: '00:00:10',
        nbrDeVue: 0,
        image: 'course.jpg',
        createdBy: 'Admin',
        dateCreation: new Date(),
        langue: 'English',
      });

      const req = {
        body: {
          titre: 'New Course',
          description: 'This is a test course',
          duree: '00:00:10',
          nbrDeVue: 0,
          image: 'course.jpg',
          createdBy: 'Admin',
          dateCreation: new Date(),
          langue: 'English',
        },
        file: {
          originalname: 'test.jpg',
          buffer: Buffer.from('test image data'),
        },
      };
      const res = { status: sinon.stub(), json: sinon.stub() };
      res.status.returnsThis();

      await coursController.createCours(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWithMatch({ message: 'Cours created successfully', idCours: 1 })).to.be.true;

      createStub.restore();
    });

  });

  describe('getAllCours', () => {
    it('should get a list of all cours', async () => {
      const findAllStub = sinon.stub(Cours, 'findAll');
      const expectedCoursList = [
        {
          idCours: 1,
          titre: 'Course 1',
          description: 'Description 1',
          duree: '00:00:10',
          nbrDeVue: 0,
          image: 'course1.jpg',
          createdBy: 'Admin',
          dateCreation: new Date(),
          langue: 'English',
        },
        {
          idCours: 2,
          titre: 'Course 2',
          description: 'Description 2',
          duree: '00:00:15',
          nbrDeVue: 0,
          image: 'course2.jpg',
          createdBy: 'Admin',
          dateCreation: new Date(),
          langue: 'French',
        },
      ];
      findAllStub.resolves(expectedCoursList);

      const req = {};
      const res = { status: sinon.stub(), json: sinon.stub() };
      res.status.returnsThis();

      await coursController.getAllCours(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(expectedCoursList)).to.be.true;

      findAllStub.restore();
    });

    it('should handle errors during getting all cours', async () => {
      const findAllStub = sinon.stub(Cours, 'findAll');
      findAllStub.rejects(new Error('Test error'));

      const req = {};
      const res = { status: sinon.stub(), json: sinon.stub() };
      res.status.returnsThis();

      await coursController.getAllCours(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWithMatch({ message: 'Test error' })).to.be.true;

      findAllStub.restore();
    });
  });

  const { expect } = require('chai');
  const sinon = require('sinon');
  const coursController = require('../controllers/coursController');
  const Cours = require('../models/Cours');
  
  describe('Cours Controller Tests', () => {
    describe('updateCours', () => {
      it('should update an existing cours by ID', async () => {
        // Stub the findByPk method on the Cours model
        const findByPkStub = sinon.stub(Cours, 'findByPk');
        findByPkStub.resolves({
          idCours: 1,
          titre: 'Old Course Title',
          description: 'Old Description',
          duree: '00:00:10',
          nbrDeVue: 0,
          image: 'old.jpg',
          createdBy: 'Admin',
          dateCreation: new Date(),
          langue: 'English',
        });
  
        // Stub the update method on the Cours model prototype
        const updateStub = sinon.stub(Cours.prototype, 'updateCours');
        updateStub.resolves({
          idCours: 1,
          titre: 'New Course Title',
          description: 'New Description',
          duree: '00:00:15',
          nbrDeVue: 0,
          image: 'new.jpg',
          createdBy: 'Admin',
          dateCreation: new Date(),
          langue: 'French',
        });
  
        // Mock request and response objects
        const req = {
          body: {
            idCours: 1,
            titre: 'New Course Title',
            description: 'New Description',
            duree: '00:00:15',
            nbrDeVue: 0,
            image: 'new.jpg',
            createdBy: 'Admin',
            dateCreation: new Date(),
            langue: 'French',
          },
          file: {
            originalname: 'test.jpg',
            buffer: Buffer.from('test image data'),
          },
        };
        const res = { status: sinon.stub(), json: sinon.stub() };
        res.status.returnsThis();
  
        // Execute the function
        await coursController.updateCours(req, res);
  
        // Assertions
        expect(res.status.calledWith(200)).to.be.true;
        expect(res.json.calledWithMatch({ idCours: 1, titre: 'New Course Title' })).to.be.true;
  
        // Restore stubs
        findByPkStub.restore();
        updateStub.restore();
      });
  
      // Add more test cases for updateCours as needed
    });
  
    // Add additional describe blocks for other functions
  });
  

  describe('deleteCours', () => {
    it('should delete a cours by ID', async () => {
      const findByPkStub = sinon.stub(Cours, 'findByPk');
      findByPkStub.resolves({
        idCours: 1,
        titre: 'Course to be deleted',
        // ... other properties
      });

      const destroyStub = sinon.stub(Cours.prototype, 'destroy');

      const req = {
        params: { id: 1 },
      };
      const res = { status: sinon.stub(), json: sinon.stub() };
      res.status.returnsThis();

      await coursController.deleteCours(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWithMatch({ idCours: 1, titre: 'Course to be deleted' })).to.be.true;

      findByPkStub.restore();
      destroyStub.restore();
    });

    it('should handle errors during cours deletion', async () => {
      const findByPkStub = sinon.stub(Cours, 'findByPk');
      findByPkStub.resolves({
        idCours: 1,
        titre: 'Course to be deleted',
        // ... other properties
      });

      const destroyStub = sinon.stub(Cours.prototype, 'destroy');
      destroyStub.rejects(new Error('Test error'));

      const req = {
        params: { id: 1 },
      };
      const res = { status: sinon.stub(), json: sinon.stub() };
      res.status.returnsThis();

      await coursController.deleteCours(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWithMatch({ message: 'Test error' })).to.be.true;

      findByPkStub.restore();
      destroyStub.restore();
    });

    it('should handle cours not found during deletion', async () => {
      const findByPkStub = sinon.stub(Cours, 'findByPk');
      findByPkStub.resolves(null);

      const req = {
        params: { id: 1 },
      };
      const res = { status: sinon.stub(), json: sinon.stub() };
      res.status.returnsThis();

      await coursController.deleteCours(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWithMatch({ message: 'Cours not found' })).to.be.true;

      findByPkStub.restore();
    });
  });

});