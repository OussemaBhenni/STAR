const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const Utilisateur = require("../models/Utilisateur"); // Import the Sequelize 'Utilisateur' model
require("dotenv").config();
const { Op } = require("sequelize");
const FROM_EMAIL = process.env.MAILER_EMAIL_ID;
const AUTH_PASSWORD = process.env.MAILER_PASSWORD;

const API_ENDPOINT =
  process.env.NODE_ENV === "production"
    ? process.env.PRODUCTION_API_URL
    : process.env.DEVELOPMENT_API_URL;

const smtpTransport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  service: "gmail",
  auth: {
    user: FROM_EMAIL,
    pass: AUTH_PASSWORD,
  },
});

const {
  forgotPasswordEmailTemplate,
  resetPasswordConfirmationEmailTemplate,
} = require("../template/userAccountEmailTemplates");
const { log } = require("console");
const randomBytesAsync = promisify(crypto.randomBytes);

async function registerUser(req, res) {
  try {
    const { nom_prenom, adresse, photo, grade, role, email, mdp, createdBy } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(mdp, 10);

    // Create a new user object with hashed password
    const newUser = await Utilisateur.create({
      nom_prenom,
      adresse,
      photo,
      grade,
      role,
      email,
      mdp: hashedPassword,
      createdBy
    });

    res.status(201).json({
      message: "Utilisateur registered successfully",
      userId: newUser.idUtilisateur,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: "An error occurred" });
  }
}

async function loginUser(req, res) {
  try {
    const { email, mdp } = req.body;
    console.log(email);
    const user = await Utilisateur.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: "Invalid email" });
    }

    const isPasswordValid = await bcrypt.compare(mdp, user.mdp);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid mdp" });
    }

    const token = jwt.sign({ UserId: user.id }, "secret_key", {
      expiresIn: "1h",
    });

    res.json({ Utilisateur: { email: user.email }, token });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
}

async function findUserByEmail(req, res) {
  try {
    
    email = req.params.email;
    const user = await Utilisateur.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: "Invalid email" });
    }

    res.json({ Utilisateur: { id: user.idUtilisateur } });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
}

async function getAllUsers(req, res) {
  try {
    console.log("here", Utilisateur);
    const users = await Utilisateur.findAll();
    console.log("here", users);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateUser(req, res) {
  try {
    const userId = req.params.id;
    console.log(userId);
    const userFieldsToUpdate = ({
      nom_prenom,
      adresse,
      photo,
      grade,
      role,
      email,
      mdp,
    } = req.body);

    const updatedRowsCount = await Utilisateur.update(userFieldsToUpdate, {
      where: { idUtilisateur: userId },
    });

    if (updatedRowsCount === 0) {
      return res.status(404).json({ error: "Utilisateur not found" });
    }

    const updatedUser = await Utilisateur.findByPk(userId);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
}

async function deleteUser(req, res) {
  try {
    const userId = req.params.id;
    const deletedRowsCount = await Utilisateur.destroy({
      where: { idUtilisateur: userId },
    });

    if (deletedRowsCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
}

async function forgotPassword(req, res) {
  try {
    // Make sure the Utilisateur model is properly defined before using it
    const user = await Utilisateur.findOne({
      where: { email: req.body.email },
    });

    if (!user) {
      throw new Error("Utilisateur not found.");
    }
    console.log(user);
    const token = Math.floor(1000 + Math.random() * 9000);

    await Utilisateur.update(
      {
        resetPasswordToken: token,
        resetPasswordExpires: new Date(Date.now() + 3600000), // token expires in 1 hour
      },
      { where: { idUtilisateur: user.idUtilisateur } }
    );

    const template = forgotPasswordEmailTemplate(
      user.nom_prenom,
      user.email,
      API_ENDPOINT,
      token
    );

    const data = {
      from: FROM_EMAIL,
      to: user.email,
      subject: "Reinitialisation de votre mot de passe",
      html: template,
    };
    // Assuming smtpTransport is properly configured and defined
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
    const user = await Utilisateur.findOne({
      where: {
        resetPasswordToken: req.params.token,
        resetPasswordExpires: { [Op.gt]: Date.now() },
      },
    });

    if (!user) {
      return res.status(400).send({
        message: "Password reset token is invalid or has expired.",
      });
    }

    const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);

    await Utilisateur.update(
      {
        mdp: hashedPassword,
        resetPasswordToken: null,
        resetPasswordExpires: null,
      },
      { where: { idUtilisateur: user.idUtilisateur } }
    );

    const template = resetPasswordConfirmationEmailTemplate(user.nom_prenom);
    const data = {
      to: user.email,
      from: FROM_EMAIL,
      subject: "Confirmation de réinitialisation du mot de passe",
      html: template,
    };

    await smtpTransport.sendMail(data);

    return res.json({ message: "Réinitialisation du mot de passe" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function checkResetToken(req, res) {
  try {
    const user = await Utilisateur.findOne({
      where: {
        resetPasswordToken: req.params.token,
        resetPasswordExpires: { [Op.gt]: Date.now() },
      },
    });

    if (!user) {
      return res.status(400).json({
        isValid: false,
        message: "Password reset token is invalid or has expired.",
      });
    }

    return res.json({ isValid: true });
  } catch (error) {
    return res.status(500).json({ isValid: false, message: error.message });
  }
}

module.exports = {
  findUserByEmail,//done
  checkResetToken,//done
  registerUser, //done
  loginUser, //done
  getAllUsers, //done
  deleteUser, //done
  updateUser, //done
  forgotPassword, //done
  resetPassword, //done
};
