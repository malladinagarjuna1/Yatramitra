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

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});


UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt =  await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});


const  p= mongoose.model('p', userSchema);
const User = mongoose.model('User', UserSchema);
module.exports = User;
module.exports = p;
