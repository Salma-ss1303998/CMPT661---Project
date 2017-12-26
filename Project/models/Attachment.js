let mongoose = require('mongoose');

let attachmentSchema = new mongoose.Schema({
    attachmentTitle: String,
    attachmentAddedOn: {type:Date,default: Date.now},
    attachmentUrl: String
});

module.exports = mongoose.model('Attachment', attachmentSchema);