let mongoose = require('mongoose');

let penaltySchema = new mongoose.Schema({
    type: { type : mongoose.Schema.ObjectId, ref : 'PenaltyType' },
    addedOn: {type:Date,default: Date.now},
    description: String
});

module.exports = mongoose.model('Penalty', penaltySchema);