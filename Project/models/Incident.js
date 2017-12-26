let mongoose = require('mongoose');

let incidentSchema = new mongoose.Schema({

    students: [{ type : mongoose.Schema.ObjectId, ref : 'Student' }],
    incidentDescription:String,
    type: { type : mongoose.Schema.ObjectId, ref : 'IncidentType' },
<<<<<<< HEAD

    date: { type:Date,default: Date.now },
=======
    date: {type:Date,default: Date.now},
>>>>>>> a32ec1df03494b880b7be566ca2df47498647584
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