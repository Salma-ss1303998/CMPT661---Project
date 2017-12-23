let mongoose = require('mongoose');

let noteSchema = new mongoose.Schema({
    title: String,
    addedOn: {type:Date,default: Date.now},
    body: String
});

module.exports = mongoose.model('Note', noteSchema);