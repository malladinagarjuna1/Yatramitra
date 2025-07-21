
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('./../models/user');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const Forgot= require('./../models/Forgot');


const JWT_SECRET = process.env.JWT_SECRET_KEY;


router.post('/signup', async (req, res) => {
  let { name, email, password, dateofbirth } = req.body;

  // Validation
  if (!name || !email || !password || !dateofbirth) {
    return res.json({
      status: "FAILED",
      message: "Empty input fields!"
    });
  }

  if (!/^[a-zA-Z ]*$/.test(name)) {
    return res.json({
      status: "FAILED",
      message: "Invalid name entered"
    });
  }

  if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    return res.json({
      status: "FAILED",
      message: "Invalid email entered"
    });
  }

  if (isNaN(new Date(dateofbirth).getTime())) {
    return res.json({
      status: "FAILED",
      message: "Invalid date of birth entered"
    });
  }

  if (password.length < 9) {
    return res.json({
      status: "FAILED",
      message: "Password should be at least 9 characters"
    });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({
        status: "FAILED",
        message: "User with the provided email already exists"
      });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      dateofbirth: new Date(dateofbirth)
    });

    const result = await newUser.save();

    return res.status(201).json({
      status: "SUCCESS",
      message: "Signup successful",
      data: result
    });

  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({
      status: "FAILED",
      message: "An error occurred during signup",
      error: err.message
    });
  }
});

// router.post('/signin', (req, res) => {
//    const { email, password } = req.body;
//   try {
//     const user =  User.findOne({ email: email }).exec();
//     if (!user) {
//       return res.status(401).json({ message: "Your credentials are incorrect. Please try again." });
//     }
// console.log("Input password:", password);
// console.log("Hashed password from DB:", user.password);
//     const isMatch = bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Your credentials are incorrect. Please try again." });
//     }

//     const token = jwt.sign({ email:user.email }, JWT_SECRET, { expiresIn: '2h' });
//     console.log(token);
//     return res.json({ message: "Login successful", token });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Server error" });
//   }
// });
router.post('/signin', async (req, res) => {
  // Validate request body first
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      message: "Email and password are required",
      errorCode: "MISSING_CREDENTIALS"
    });
  }

  const cleanEmail = req.body.email.trim().toLowerCase();
  const cleanPassword = req.body.password.trim();

  try {
    console.log("\n--- SIGNIN ATTEMPT ---");
    console.log(`Email: ${cleanEmail}`);
    console.log(`Password: ${cleanPassword.length} characters`);

    // Find user with password field explicitly selected
    const user = await User.findOne({ email: cleanEmail }).select('+password').exec();
    
    if (!user) {
      console.log('❌ User not found');
      return res.status(401).json({ 
        message: "Invalid credentials",
        errorCode: "USER_NOT_FOUND"
      });
    }

    console.log(`✅ User found: ${user.email}`);
    console.log(`🔑 Password exists: ${!!user.password}`);
    
    // Check if password is present
    if (!user.password) {
      console.error('❌ Password missing in database record');
      return res.status(500).json({
        message: "Authentication system error",
        errorCode: "MISSING_PASSWORD_HASH"
      });
    }

    // Verify password
    console.log('🔒 Comparing passwords...');
    console.log("clean Password is", cleanPassword);
    console.log("password in the db is ",user.password);
    const isMatch = await bcrypt.compare(cleanPassword, user.password);
    
    if (isMatch) {
      console.log('✅ Password matched');
      
      // Generate JWT token
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '2h' }
      );
      
      console.log('🔐 Token generated');
      return res.json({ 
        message: "Login successful", 
        token,
        userId: user._id,
        email: user.email
      });
    } else {
      console.log('❌ Password mismatch');
      return res.status(401).json({ 
        message: "Invalid credentials",
        errorCode: "PASSWORD_MISMATCH"
      });
    }
    
  } catch (error) {
    console.error('\n--- SIGNIN ERROR ---');
    console.error(error);
    
    // Special handling for bcrypt errors
    if (error.message.includes('data and hash arguments required')) {
      console.error('⚠️ Bcrypt argument error');
      return res.status(400).json({
        message: "Authentication failed",
        details: "Password data is missing",
        errorCode: "BCRYPT_ARG_ERROR"
      });
    }
    
    return res.status(500).json({ 
      message: "Server error",
      errorCode: "SERVER_ERROR"
    });
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
router.post('/resetPassword', async (req, res) => {
  const { token, password } = req.body;

  try {
    const resetRecord = await Forgot.findOne({ token });

    if (!resetRecord || resetRecord.expires < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const user = await User.findOne({ email: resetRecord.email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    // Remove token after successful reset
    await Forgot.deleteOne({ token });

    res.status(200).json({ message: "Password has been reset" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});







module.exports = router;