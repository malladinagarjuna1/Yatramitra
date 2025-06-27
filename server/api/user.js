
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('./../models/user');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');


const JWT_SECRET = process.env.JWT_SECRET_KEY;




router.post('/signup', (req, res) => {
  let { name, email, password, dateofbirth } = req.body;

  if (name == "" || email == "" || password == "" || dateofbirth == "") {
    res.json({
      status: "FAILED",
      message: "Empty input fields!"
    });
  } else if (!/^[a-zA-Z ]*$/.test(name)) {
    res.json({
      status: "FAILED",
      message: "Invalid name entered"
    });
  } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    res.json({
      status: "FAILED",
      message: "Invalid email entered"
    });
  }
  else if (isNaN(new Date(dateofbirth).getTime())) {
    return res.json({
      status: "FAILED",
      message: "Invalid date of birth entered"
    });
  }
  else if (password.length < 9) {
    res.json({
      status: "Failed",
      message: "Password should be at least 9 characters"
    })
  }
  else {
    User.findOne({ email }).then(existingUser => {
      if (existingUser) {
        return res.json({
          status: "Failed",
          message: "User with the provided mail already exists"
        });
      }
      else {
        const saltRounds = 10;
        bcrypt.hash(password, saltRounds).then(hashedPassword => {
          const newUser = new User({
            name,
            email,
            password: hashedPassword,
            dateofbirth: new Date(dateofbirth)
          });
          newUser.save().then(result => {
            res.json({
              status: "SUCCESS",
              message: "Signup successfull",
              data: result,

            })
          }).catch(err => {
            console.log("Error saving user", err);
            res.json({
              status: "failed",
              message: "am error occurred while saving the password",
              error: err.message
            })
          })
        })
      }
    }).catch(err => {
      console.log(err);
      res.json({
        status: "Failed",
        message: "an error occured while checking for existing user"
      });
    });
  }
})

router.post('/signin', (req, res) => {
   const { email, password } = req.body;
  try {
    const user =  User.findOne({ email: email }).exec();
    if (!user) {
      return res.status(401).json({ message: "Your credentials are incorrect. Please try again." });
    }
console.log("Input password:", password);
console.log("Hashed password from DB:", user.password);
    const isMatch = bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Your credentials are incorrect. Please try again." });
    }

    const token = jwt.sign({ email:user.email }, JWT_SECRET, { expiresIn: '2h' });
    console.log(token);
    return res.json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }

});


router.post('/requestPasswordReset', (req, res) => {
  const { email } = req.body;

  try {
    const user = User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User does'nt exist" });

    const secret = process.env.JWT_SECRET_KEY + user.password;
    const token = jwt.sign({ email: user.email }, secret, { expiresIn: '1h' });

    const resetURL = `https://localhost:5000/resetpassword?id=${user._id}&token=${token}`;
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'malladinagarjuna1@gmail.com',
        pass: 'password'
      },
    });
    const mailOptions = {
      to: user.email,
      from: process.env.EMAIL,
      subject: 'Password Reset Request',
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
      Please click on the following link, or paste this into your browser to complete the process:\n\n
      ${resetURL}\n\n
      If you did not request this, please ignore this email and your password will remain unchanged.\n`,

    };
    transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Password reset link sent' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});
router.post('/resetPassword', (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = user.findOne({
      email: user.email
    });
    if (!user) {
      return res.status(400).json({ message: "User not exist" });

    }
    const secret = process.env.JWT_SECRET_KEY + user.password;
    const verify = jwt.verify(token, secret);
    const encryptedPassword = bcrypt.hash(password, 10);

    User.updateOne({
      email: user.email,
    },
      {
        $set: {
          password: encryptedPassword,
        },
      });
    user.save();

    res.status(200).json({ message: 'Password has been reset' });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'something went wrong' });

  }
});







module.exports = router;