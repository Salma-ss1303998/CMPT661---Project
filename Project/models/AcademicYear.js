let mongoose = require('mongoose');

let academicYearSchema = new mongoose.Schema({
    year: String,

});

module.exports = mongoose.model('AcademicYear', academicYearSchema);