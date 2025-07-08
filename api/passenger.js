

const express = require('express');
const router = express.Router();
const getpassengerModel= require('.././models/passenger');
 const Passenger= getpassengerModel();
router.post('/passengerdetails', async(req, res)=>{
    const {firstandMiddleName, LastName, Dateofbirth}= req.body;
   
    if (firstandMiddleName == ""|| LastName == ""|| Dateofbirth == ""){
        res.json({
            status: "failed",
            message: "empty fields"
        })

     }
       const newUser = new Passenger({
            firstandMiddleName,
            LastName,
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
        }).catch(err => {
      console.log(err);
      res.json({
        status: "Failed",
        message: "an error occured while checking for existing user"
      });
    });
      


    module.exports = router;
        