let mongoose = require('mongoose');

let incidentSchema = new mongoose.Schema({

    students: [{ type : mongoose.Schema.ObjectId, ref : 'Student' }],
    description:String,
    type: { type : mongoose.Schema.ObjectId, ref : 'IncidentType' },
    date: {type:Date,default: Date.now},
    location: { type : mongoose.Schema.ObjectId, ref : 'Location' },
    studentReporter: { type : mongoose.Schema.ObjectId, ref : 'Student' },
    staffReporter: { type : mongoose.Schema.ObjectId, ref : 'Staff' },
    status: { type : mongoose.Schema.ObjectId, ref : 'Status'},
    notes: [{ type : mongoose.Schema.ObjectId, ref : 'Note' }],
    penalties: [{ type : mongoose.Schema.ObjectId, ref : 'Penalty' }],
    attachments: [{ type : mongoose.Schema.ObjectId, ref : 'Attachment' }],
    academicYear: { type : mongoose.Schema.ObjectId, ref : 'AcademicYear' }
});


module.exports = mongoose.model('Incident', incidentSchema);