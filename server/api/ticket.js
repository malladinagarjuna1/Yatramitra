const express = require('express');
const { connectToMongoDB } = require('../config/seat');
const  router = express.router();

router.get('/ticket',(req, res)=>{
     try{
        connectToMongoDB(){
            
        }
     }
})