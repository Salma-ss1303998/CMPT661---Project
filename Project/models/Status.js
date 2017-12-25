let mongoose = require('mongoose');

let statusSchema = new mongoose.Schema({
    status: {type:String,default:"Open"},
});

module.exports = mongoose.model('Status', statusSchema);