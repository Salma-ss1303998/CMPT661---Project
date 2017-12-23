const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
    firstName: String,
    lastName:String,
    dateOfBirth:Date,
    gender:String,
    nationalId:String,
    homePhone:String,
    mobile:String,
    email:String,
    street:String,
    city:String,
    country:String,
    occupation:String,
    role:String,
    password:String
});


module.exports = mongoose.model('staff', staffSchema);
