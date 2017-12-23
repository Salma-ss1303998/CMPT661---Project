let mongoose = require('mongoose');

let statusSchema = new mongoose.Schema({
    status: String,
});

module.exports = mongoose.model('Status', statusSchema);