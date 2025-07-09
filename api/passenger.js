const express = require('express');
const router = express.Router();
const initializePassengerModel = require('../models/passenger');

router.post('/passengerdetails', async (req, res) => {
  try {
    const Passenger =  await initializePassengerModel();
    const  { firstandMiddleName, LastName, Dateofbirth } = req.body;

    if (!firstandMiddleName || !LastName || !Dateofbirth) {
      return res.status(400).json({
        status: "failed",
        message: "All fields are required"
      });
    }

    const newUser = new Passenger({
      firstandMiddlename: firstandMiddleName,
      LastName,
      Dateofbirth: new Date(Dateofbirth)
    });

    const result = await newUser.save();
    res.json({
      status: "SUCCESS",
      message: "Passenger details saved",
      data: result,
    });
  } catch (err) {
    console.error("Error saving passenger:", err);
    res.status(500).json({
      status: "failed",
      message: "Database error",
      error: err.message
    });
  }
});

module.exports = router;