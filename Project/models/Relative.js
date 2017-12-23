const mongoose = require('mongoose');

const relativeSchema = new mongoose.Schema({
    firstName: String,
    lastName:String,
    dateOfBirth:{type:Date,default: Date.now},
    gender:String,
    nationalId:String,
    homePhone:String,
    mobile:String,
    street:String,
    email:String,
    city:String,
    country:String,
    occupation:String,
    nameOfEmployer:String,
    employerCity:String,
    employerCountry:String,
    employerPhone:String,
    relationWithStudent:String,
    isPrimary:{type:Boolean, default:false},
    password:String
});

module.exports = mongoose.model('Relative', relativeSchema);