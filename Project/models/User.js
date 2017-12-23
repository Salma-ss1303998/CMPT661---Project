let mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    password: String,
    username:String,
});


module.exports = mongoose.model('User', userSchema);