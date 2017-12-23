let mongoose = require('mongoose');

let attachmentSchema = new mongoose.Schema({
    title: String,
    addedOn: {type:Date,default: Date.now},
    url: String
});

module.exports = mongoose.model('Attachment', attachmentSchema);