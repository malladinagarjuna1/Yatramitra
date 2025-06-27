require('./config/db');
const express = require('express');
const app = express();
const port =5000;

const bodyParser= require('express').json();
app.use(express.json());
const UserRouter = require('./api/user.js');
app.use('/', UserRouter);

app.listen(port, () =>{
    console.log(`server is running on port ${port}`);

})

