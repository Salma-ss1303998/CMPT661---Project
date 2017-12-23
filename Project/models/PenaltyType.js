let mongoose = require('mongoose');

let penaltyTypeSchema = new mongoose.Schema({
    type: String,
});

module.exports = mongoose.model('PenaltyType',  penaltyTypeSchema);