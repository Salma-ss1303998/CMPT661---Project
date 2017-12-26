let mongoose = require('mongoose');

let penaltySchema = new mongoose.Schema({
    penaltyType: { type : mongoose.Schema.ObjectId, ref : 'PenaltyType' },
    penaltyAddedOn: {type:Date,default: Date.now},
    penaltyDescription: String
}, { usePushEach: true });

module.exports = mongoose.model('Penalty', penaltySchema);