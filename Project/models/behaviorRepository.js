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
const User = require('./User')

const fs = require('fs-extra')

class behaviorRepository {
    constructor() {
    }

    //----------- Login ---------------------//
    async login(username, password) {

        const user = await User.findOne({username: username}).where('password')
            .equals(password);

        console.log("user : " + user)

        if (user != "undefined" && user != null && user!="") {
            //Do not return the user password, remove it
            delete user.password
            return user;

        }
        else {
            console.log("Invalid")
            throw "Username and/or password invalid"
        }
    }

    //----------- Login ---------------------//


    async addUser(user) {
        return await User.create(user)

    }

    async getUsers() {
        return await User.find({})
    }

    async getUsersCount() {
        return await User.count({})
    }

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

    async getAcademicYears() {
        return await AcademicYear.find({})
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
        await User.remove({})
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
        //Adding users
        const usersData = await fs.readFile('data/users.json')
        const users = JSON.parse(usersData)

        console.log('Retrieved Staff from json file and added to MongoDB staff Collection: ' + users.length)
        for (const usr of users) {
            await this.addUser(usr)
        }

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


        //Adding Students
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

    }
}

module.exports = new behaviorRepository();