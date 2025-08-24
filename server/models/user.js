const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String  },
  phone_number: String,
  email: {
    type: String
    
  },
  gender: String,
  username: {
    type: String
  
  
  },
  password: {
    type: String
  },
  confirm_password: {
    type: String
  },
  status: {
    type: String
  },
  dateofbirth:String

});





const User = mongoose.model('users', UserSchema);
module.exports = User;
