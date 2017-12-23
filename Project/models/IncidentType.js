let mongoose = require('mongoose');

let incidentTypeSchema = new mongoose.Schema({
    type: String,
});

module.exports = mongoose.model('IncidentType', incidentTypeSchema );