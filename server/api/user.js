
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('./../models/user');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const Forgot= require('./../models/Forgot');


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


router.post('/requestPasswordReset', async (req, res) => {
 try{
  const{email}= req.body;
  const user=  await User.findOne({email:email});
  if(!user){
    return res.status(400).json({message: "User does not exist"});

  }
  const token = crypto.randomBytes(20).toString('hex');
  const expires =Date.now() + 3600000;
  await Forgot.findOneAndUpdate({email:email},
    {email, token, expires},
   {upsert: true, new: true} );
   const resetLink = `http://localhost:5173/forgot-password?token=${token}`;
   const mail = process.env.EMAIL;
   const pass= process.env.EMAIL_PASS;
   const transporter = nodemailer.createTransport({
    service: "gmail",
    host:"smtp.gmail.com",
    port:587,
    secure: false,
    auth:{/*qhyw rdub ypoq tmmp*/
      
      user: mail,
      pass: pass
    },
   });
   const mailOptions = {
    from:{  
      name: "Yatra Mitra",
      address: mail
    },
    to: email,
    subject: "forgot password",
    text: `You are receiving this because you (or someone else) have requested to reset your password. Please click the following link, or paste it into your browser to complete the process: ${resetLink}`,
   };
  await  transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(error);
    
  return res.status(200).json({ message: "Email sent" });
  }
  
});
router.get("/verify",(req,res)=>{
  return res.status(200).json({message:"User is logged in"});
 
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