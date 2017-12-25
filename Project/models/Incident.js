let mongoose = require('mongoose');

let incidentSchema = new mongoose.Schema({

    students: [{ type : mongoose.Schema.ObjectId, ref : 'Student' }],
    description:String,
    type: { type : mongoose.Schema.ObjectId, ref : 'IncidentType' },
<<<<<<< HEAD
    date: { type:Date,default: Date.now },
    time: { type:Date,default: Date.now },
=======
    date: {type:Date,default: Date.now},
>>>>>>> 6f714835ca0f8b0950f9e5627f84f42775bf98df
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