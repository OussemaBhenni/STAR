const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
require('dotenv').config();
const FROM_EMAIL = process.env.MAILER_EMAIL_ID;
const AUTH_PASSWORD = process.env.MAILER_PASSWORD;

const API_ENDPOINT =
  process.env.NODE_ENV === 'production'
    ? process.env.PRODUCTION_API_URL
    : process.env.DEVELOPMENT_API_URL;

var smtpTransport = nodemailer.createTransport({
  host:'smtp.gmail.com',
  port: 465,
  secure: true, // true for 465, false for other ports
  service: 'gmail',
  auth: {
    user:FROM_EMAIL,
   pass: AUTH_PASSWORD,
  },
});


const { forgotPasswordEmailTemplate, resetPasswordConfirmationEmailTemplate,} = require('../template/userAccountEmailTemplates');
const User = require('../models/User');
const { log } = require('console');
const randomBytesAsync = promisify(crypto.randomBytes);


//register
async function registerUser(req, res) {
  try {
    const { nom,email, mdp } = req.body;
    /* Validate mdp: at least 8 characters, 1 uppercase letter, 1 digit
    const mdpRegex = /^(?=.*[A-Z])(?=.*\d).{8,14}$/;
    if (!mdp.match(mdpRegex)) {
      return res.status(400).json({ error: 'Invalid mdp format' });
    }*/
    const hashedPassword = await bcrypt.hash(mdp, 10);

    const newUser = new User({
        nom,
      email,
      mdp: hashedPassword,
    
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
}
//login
async function loginUser(req, res) {
  try {
    const { email, mdp } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid email' });
    }

    const isPasswordValid = await bcrypt.compare(mdp,user.mdp);

   if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid mdp' });
    }

    const token = jwt.sign({ UserId: user._id }, 'secret_key', { expiresIn: '1h' });

    res.json({ User: { email: user.email }, token });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
}
//getAllUsers
async function getAllUsers(req, res) {
  try {
    const Users = await User.find();
    res.status(200).json(Users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
//updateUser
async function updateUser(req, res) {
  try {
    const userId = req.body._id; // User ID
    const userFieldsToUpdate = {
      nom: req.body.nom,
      prenom: req.body.prenom,
      cin: req.body.cin,
      email: req.body.email,
      mdp: req.body.mdp,
      role: req.body.role,
    };

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $set: userFieldsToUpdate },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
}


function deleteUser(req, res) {
  const id = req.params.id; // Assuming you're sending the user ID in the request body

  // Use findByIdAndRemove to remove a document by its ID
  User.findByIdAndRemove(id)
    .exec()
    .then((result) => {
      // If no user found with the given ID, result will be null
      if (!result) {
        console.log(id);
        return res.status(404).json({ error: 'User not found' });
      }
      return res.status(200).json("user deleted successfully");
    })
    .catch((error) => {
      // Handle the error gracefully
      console.error('An error occurred:', error);
      return res.status(500).json({ error: 'An error occurred while processing your request' });
    });
}






async function forgotPassword(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email }).exec();

    if (!user) {
      throw new Error('User not found.');
    }

    const token = Math.floor(1000 + Math.random() * 9000);

    await User.findByIdAndUpdate(
      { _id: user._id },
      {
        resetPasswordToken: token,
        resetPasswordExpires: Date.now() + 3600000, // token expires in 1 hour
      },
      { new: true }
    ).exec();

    const template = forgotPasswordEmailTemplate(
      user.nom,
      user.email,
      API_ENDPOINT,
      token,
    );

    const data = {
      from: FROM_EMAIL,
      to: user.email,
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
    const user = await User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() },
    }).exec();

    if (!user) {
      return res.status(400).send({
        message: 'Password reset token is invalid or has expired.',
      });
    }

   /* if (req.body.newPassword !== req.body.verifyPassword) {
      return res.status(422).send({
        message: 'Passwords do not match',
      });
    }*/
    const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);

    user.mdp = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    const template = resetPasswordConfirmationEmailTemplate(user.nom);
    const data = {
      to: user.email,
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

module.exports = { registerUser, loginUser, getAllUsers ,deleteUser,updateUser,forgotPassword ,resetPassword };
