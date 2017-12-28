let mongoose = require('mongoose');

let incidentSchema = new mongoose.Schema({

    students: [{ type : mongoose.Schema.ObjectId, ref : 'Student' }],
    incidentDescription:String,
    type: { type : mongoose.Schema.ObjectId, ref : 'IncidentType' },
    date: { type:Date,default: Date.now },
    location: { type : mongoose.Schema.ObjectId, ref : 'Location' },
    studentReporter: { type : mongoose.Schema.ObjectId, ref : 'Student',required:false },
    staffReporter: { type : mongoose.Schema.ObjectId, ref : 'Staff',required:false },
    status: { type : mongoose.Schema.ObjectId, ref : 'status'},
    notes: [{ type : mongoose.Schema.ObjectId, ref : 'Note' }],
    penalties: [{ type : mongoose.Schema.ObjectId, ref : 'Penalty' }],
    attachments: [{ type : mongoose.Schema.ObjectId, ref : 'Attachment' }],
    academicYear: { type : mongoose.Schema.ObjectId, ref : 'AcademicYear' }
}, { usePushEach: true });


module.exports = mongoose.model('Incident', incidentSchema);