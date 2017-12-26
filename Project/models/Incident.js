let mongoose = require('mongoose');

let incidentSchema = new mongoose.Schema({

    students: [{ type : mongoose.Schema.ObjectId, ref : 'Student' }],
    incidentDescription:String,
    type: { type : mongoose.Schema.ObjectId, ref : 'IncidentType' },
<<<<<<< HEAD
    date: {type:Date,default: Date.now},
=======
    date: { type:Date,default: Date.now },
>>>>>>> 8c8ca151fa6f133c3435382b59209c19c2f39d30
    location: { type : mongoose.Schema.ObjectId, ref : 'Location' },
    studentReporter: { type : mongoose.Schema.ObjectId, ref : 'Student' },
    staffReporter: { type : mongoose.Schema.ObjectId, ref : 'Staff' },
    status: { type : mongoose.Schema.ObjectId, ref : 'Status'},
    notes: [{ type : mongoose.Schema.ObjectId, ref : 'Note' }],
    penalties: [{ type : mongoose.Schema.ObjectId, ref : 'Penalty' }],
    attachments: [{ type : mongoose.Schema.ObjectId, ref : 'Attachment' }],
    academicYear: { type : mongoose.Schema.ObjectId, ref : 'AcademicYear' }
}, { usePushEach: true });


module.exports = mongoose.model('Incident', incidentSchema);