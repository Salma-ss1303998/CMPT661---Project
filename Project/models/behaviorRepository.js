const AcademicYear = require('./AcademicYear')
const Attachment = require('./Attachment')
const Incident = require('./Incident')
const IncidentType = require('./IncidentType')
const Location = require('./Location')
const Note = require('./Note')
const Penalty = require('./Penalty')
const PenaltyType = require('./PenaltyType')
const Relative = require('./Relative')
const Staff = require('./Staff')
const Status = require('./Status')
const Student = require('./Student')
const fs = require('fs-extra')

class behaviorRepository {
    constructor() {
    }

    //----------- Login ---------------------//
    async login(username, password) {
        let user = await Staff.findOne({email: username}).where('password')
            .equals(password);
        if (!user) {
            user = await Relative.findOne({email: username}).where('password')
                .equals(password).lean(); // lean to allow adding user.role
            if (user)
            user.role="Relative"
        }
        if (user != "undefined" && user != null && user != "") {
            //Do not return the user password, remove it
            delete user.password;
            console.log("User:" , user);
            return user;
        }
        else {
            // console.log("User:" + user);
            console.log("Invalid")
            throw "Username and/or password invalid"
        }
    }


    //----------- Login ---------------------//

    async addStudent(newStudent) {
        return await Student.create(newStudent)

    }

    async getStudents() {
        return await Student.find({})
    }

    async getStudentsCount() {
        return await Student.count({})
    }

    async addStaff(newStaff) {
        return await Staff.create(newStaff)
    }

    async getStaffs() {
        return await Staff.find({})
    }

    async getStaffCount() {
        return await Staff.count({})
    }

    async addRelative(newRelative) {
        return await Relative.create(newRelative)
    }

    async getRelatives() {
        return await Relative.find({})
    }

    async getRealtivesCount() {
        return await Relative.count({})
    }

    async addAcademicYear(newAcademicYear) {
        return await AcademicYear.create(newAcademicYear)
    }

    async getAcademicYears() {
        return await AcademicYear.find({})
    }

    async getAcademicYearCount() {
        return await AcademicYear.count({})
    }

    async addStatus(status) {
        return await Status.create(status)
    }

    async getStatus() {
        return await Status.find({})
    }

    async getStatusCount() {
        return await Status.count({})
    }

    async addIncidentType(newIncidentType) {
        return await IncidentType.create(newIncidentType)
    }

    async getIncidentType() {
        return await IncidentType.find({})
    }

    async getIncidentTypeCount() {
        return await IncidentType.count({})
    }

    async addLocation(newLocation) {
        return await Location.create(newLocation)
    }

    async getLocation() {
        return await Location.find({})
    }

    async getLocationCount() {
        return await Location.count({})
    }
    async getPenaltyType () {
        return await PenaltyType.find({})
    }

    async getPenaltyTypeCount() {
        return await PenaltyType.count({})
    }
    async addPenaltyType(newPenaltyType) {
        return await PenaltyType.create(newPenaltyType)
    }
    async getIncident () {
        return await  Incident.find({})
    }
    async getIncidentCount() {
        return await Incident.count({})
    }
    async addIncident(newIncident) {
        return await  Incident.create(newIncident)
    }
    async getAttachment () {
        return await  Attachment.find({})
    }
    async getIAttachmentCount() {
        return await Attachment.count({})
    }
    async addAttachment(newAttachment) {
        return await  Attachment.create(newAttachment)
    }
    async getStudentByID(id) {
        return Student.findOne({studentId: id})
    }

    async getIncidentByID(id) {
        return Incident.findOne({_id : id})
    }
    async getAttachmentByID(id) {
        return Attachment.findOne({_id : id})
    }

    async addAttachmentToIncident(incident, attachmentID) {
        //const i= await this.getIncidentByID(iId);
        //const a= await this.getAttachmentByID(aID);
        console.log("inc :",incident);
        console.log("att :",attachmentID);
        incident.attachments.push(attachmentID)
        return incident.save()
    }


    /* Get relatives by matching the last name of student and Relative */
    getRelative(lastname) {
        //Only retrieve the Relative id
        const query = Relative.find({}, "_id")
        //If lastName is defined then filter by lastName
        if (lastname) {
            query.where({lastName: lastname})
        }
        return query
    }

    //in case needed during testing
    async emptyDB() {
        await Student.remove({})
        await Staff.remove({})
        await Relative.remove({})
        await AcademicYear.remove({})
        await IncidentType.remove({})
        await Location.remove({})
        await PenaltyType.remove({})
        await Status.remove({})
    }

    async initDb() {
        try {
            //Empty the database. Comment out emptyDB to stop re-initializing the DB
            await this.emptyDB()
            //If the db is empty then load data from json files
            const studentCount = await this.getStudentsCount()
            console.log(`Students Count: ${studentCount}. Comment out emptyDB() to stop re-initializing the database`)
            //if (studentCount == 0) {
            await this.loadDataFromJsonFiles()
            //}
        }
        catch (err) {
            console.log(err)
        }
    }

    async loadDataFromJsonFiles() {

        //Adding Staff
        const staffData = await fs.readFile('data/staff.json')
        const staff = JSON.parse(staffData)
        console.log('Retrieved Staff from json file and added to MongoDB staff Collection: ' + staff.length)
        for (const stf of staff) {
            await this.addStaff(stf)
        }

        //Adding relatives
        const relativeData = await fs.readFile('data/relative.json')
        const relatives = JSON.parse(relativeData)
        console.log('Retrieved Relatives from json file and added to MongoDB Relative Collection: ' + relatives.length)
        for (const relative of relatives) {
            await this.addRelative(relative)
        }


        //Adding Students with their relatives
        let studentData = await fs.readFile('data/student.json')
        let students = JSON.parse(studentData)
        console.log('Retrieved students from json file and added to MongoDB Student Collection: ' + students.length)
        for (let std of students) {
            const relatives = await this.getRelative(std.lastName)
            let temp = []
            for (let rel of relatives) {
                temp.push(rel);
            }
            std.relatives = temp
            await this.addStudent(std)
        }

        //Adding Status
        const academicYearData = await fs.readFile('data/academicYear.json')
        const academicYears = JSON.parse(academicYearData)
        console.log('Retrieved Staff from json file and added to MongoDB Academic Years Collection: ' + academicYears.length)
        for (const y of academicYears) {
            await this.addAcademicYear(y)
        }

        //Adding Status
        const statusData = await fs.readFile('data/status.json')
        const status = JSON.parse(statusData)
        console.log('Retrieved Staff from json file and added to MongoDB status Collection: ' + status.length)
        for (const s of status) {
            await this.addStatus(s)
        }

        //Adding IncidentType
        const incidentTypesData = await fs.readFile('data/incidentType.json')
        const incidentTypes = JSON.parse(incidentTypesData)
        console.log('Retrieved Staff from json file and added to MongoDB incidentTypesData Collection: ' + incidentTypes.length)
        for (const i of incidentTypes) {
            await this.addIncidentType(i)
        }

        //Adding Locations
        const locationsData = await fs.readFile('data/location.json')
        const locations = JSON.parse(locationsData)
        console.log('Retrieved Staff from json file and added to MongoDB locations Collection: ' + locations.length)
        for (const l of locations) {
            await this.addLocation(l)
        }





    }
}

module.exports = new behaviorRepository();
