let mongoose = require('mongoose');

let noteSchema = new mongoose.Schema({
    noteTitle: String,
    noteAddedOn: {type:Date,default: Date.now},
    noteBody: String
});

module.exports = mongoose.model('Note', noteSchema);