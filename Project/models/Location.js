let mongoose = require('mongoose');

let locationSchema = new mongoose.Schema({
    location: String,
});

module.exports = mongoose.model('Location', locationSchema);