const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { Utilisateur } = require('../models/Utilisateur'); // Import the Sequelize 'Utilisateur' model
require('dotenv').config();
const FROM_EMAIL = process.env.MAILER_EMAIL_ID;
const AUTH_PASSWORD = process.env.MAILER_PASSWORD;

const API_ENDPOINT =
  process.env.NODE_ENV === 'production'
    ? process.env.PRODUCTION_API_URL
    : process.env.DEVELOPMENT_API_URL;

const smtpTransport = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  service: 'gmail',
  auth: {
    user: FROM_EMAIL,
    pass: AUTH_PASSWORD,
  },
});

const { forgotPasswordEmailTemplate, resetPasswordConfirmationEmailTemplate } = require('../template/userAccountEmailTemplates');
const { log } = require('console');
const randomBytesAsync = promisify(crypto.randomBytes);

async function registerUser(req, res) {
  try {
    const { nom, email, mdp } = req.body;
    const hashedPassword = await bcrypt.hash(mdp, 10);

    const newUser = await Utilisateur.create({
      nom,
      email,
      mdp: hashedPassword,
    });

    res.status(201).json({ message: 'Utilisateur registered successfully', userId: newUser.id });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
}

async function loginUser(req, res) {
  try {
    const { email, mdp } = req.body;
    const Utilisateur = await Utilisateur.findOne({ where: { email } });

    if (!Utilisateur) {
      return res.status(401).json({ error: 'Invalid email' });
    }

    const isPasswordValid = await bcrypt.compare(mdp, Utilisateur.mdp);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid mdp' });
    }

    const token = jwt.sign({ UserId: Utilisateur.id }, 'secret_key', { expiresIn: '1h' });

    res.json({ Utilisateur: { email: Utilisateur.email }, token });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
}

async function getAllUsers(req, res) {
  try {
    console.log("here",Utilisateur);
    const users = await Utilisateur.findAll();
    
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateUser(req, res) {
  try {
    const userId = req.body.id; // Utilisateur ID
    const userFieldsToUpdate = {
      nom: req.body.nom,
      prenom: req.body.prenom,
      // ... other fields
    };

    const [updatedRowsCount] = await Utilisateur.update(userFieldsToUpdate, { where: { id: userId } });

    if (updatedRowsCount === 0) {
      return res.status(404).json({ error: 'Utilisateur not found' });
    }

    const updatedUser = await Utilisateur.findByPk(userId);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
}

async function deleteUser(req, res) {
  try {
    const userId = req.params.id;
    const deletedRowsCount = await Utilisateur.findByPk (id);

    if (deletedRowsCount === 0) {
      return res.status(404).json({ error: 'Utilisateur not found' });
    }

    res.status(200).json({ message: 'Utilisateur deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
}

async function forgotPassword(req, res) {
  try {
    const Utilisateur = await Utilisateur.findOne({ where: { email: req.body.email } });

    if (!Utilisateur) {
      throw new Error('Utilisateur not found.');
    }

    const token = Math.floor(1000 + Math.random() * 9000);

    await Utilisateur.update(
      {
        resetPasswordToken: token,
        resetPasswordExpires: new Date(Date.now() + 3600000), // token expires in 1 hour
      },
      { where: { id: Utilisateur.id } }
    );

    const template = forgotPasswordEmailTemplate(Utilisateur.nom, Utilisateur.email, API_ENDPOINT, token);

    const data = {
      from: FROM_EMAIL,
      to: Utilisateur.email,
      subject: 'Reinitialisation de votre mot de passe',
      html: template,
    };
    await smtpTransport.sendMail(data);

    return res.json({
      message: "Veuillez vérifier votre e-mail pour plus d'instructions",
    });
  } catch (error) {
    return res.status(422).json({ message: error.message });
  }
}

async function resetPassword(req, res) {
  try {
    const Utilisateur = await Utilisateur.findOne({
      where: {
        resetPasswordToken: req.params.token,
        resetPasswordExpires: { [Op.gt]: Date.now() },
      },
    });

    if (!Utilisateur) {
      return res.status(400).send({
        message: 'Password reset token is invalid or has expired.',
      });
    }

    const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);

    await Utilisateur.update(
      {
        mdp: hashedPassword,
        resetPasswordToken: null,
        resetPasswordExpires: null,
      },
      { where: { id: Utilisateur.id } }
    );

    const template = resetPasswordConfirmationEmailTemplate(Utilisateur.nom);
    const data = {
      to: Utilisateur.email,
      from: FROM_EMAIL,
      subject: 'Confirmation de réinitialisation du mot de passe',
      html: template,
    };

    await smtpTransport.sendMail(data);

    return res.json({ message: 'Réinitialisation du mot de passe' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = { registerUser, loginUser, getAllUsers, deleteUser, updateUser, forgotPassword, resetPassword };
