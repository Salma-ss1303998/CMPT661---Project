let mongoose = require('mongoose');

let academicYearSchema = new mongoose.Schema({
    year: {type:String,default:"2017-2018"}

});

module.exports = mongoose.model('AcademicYear', academicYearSchema);