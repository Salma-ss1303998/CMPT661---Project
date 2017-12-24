class behaviorController {

    constructor() {
        this.behaviorRespository = require('../models/behaviorRepository')
    }

    /* --------------------------- LOGIN ----------------------*/
    login(req, res) {
        const loginInfo = req.body
        console.log("app.post(/api/login).req.body", loginInfo)

        this.behaviorRespository.login(loginInfo.username, loginInfo.password).then(user => {
            req.session.user = user
            res.redirect('/index')//req.session.prevUrl)
        })
            .catch(err => {
                console.log(err)
                res.render('login', {errMessage: err})
            })
    }

    /* --------------------------- LOGIN ----------------------*/

    async getIncidentsData(req, res) {
        let students = await this.behaviorRespository.getStudents();
        let academicYears = await this.behaviorRespository.getAcademicYears();
        res.render('incidents', {students: students, academicYears: academicYears})
    }

    async editIncident(req, res) {
        let students = await this.behaviorRespository.getStudents();
        let academicYears = await this.behaviorRespository.getAcademicYears();
        let incidentTypes = await this.behaviorRespository.getIncidentType();
        let locations = await this.behaviorRespository.getLocation();
        let statuses=await this.behaviorRespository.getStatus()
        res.render('incidentEditor', {
            students: students,
            academicYears: academicYears,
            incidentType: incidentTypes,
            locations: locations,
            statuses:statuses
        })
    }

    async initDb(req, res) {
        await this.behaviorRespository.initDb();
        if (res) {
            res.status(200).send('done')
        }
    }

    async getStaffs(req, res) {
        let staffs = await this.behaviorRespository.getStaffs();
        let c = await this.behaviorRespository.getStaffCount();
        console.log("Staff count:" + c);
        res.json(staffs)
    }

    async getRealtives(req, res) {
        let relatives = await this.behaviorRespository.getRelatives();
        let c = await this.behaviorRespository.getRealtivesCount();
        console.log("Realtives count:" + c);
        res.json(relatives)
    }

    async getStudents(req, res) {
        let studnets = await this.behaviorRespository.getStudents();
        let c = await this.behaviorRespository.getStudentsCount();
        console.log("Students count:" + c);
        res.json(studnets)
    }

    async getAcademicYears(req, res) {
        let academicYears = await this.behaviorRespository.getAcademicYears();
        let c = await this.behaviorRespository.getAcademicYearCount();
        console.log("Academic Year count:" + c);
        res.json(academicYears)
    }

    async getStatus(req, res) {
        let status = await this.behaviorRespository.getStatus();
        let c = await this.behaviorRespository.getStatusCount();
        console.log("Status count:" + c);
        res.json(status)
    }

    async getUsers(req, res) {
        let users = await this.behaviorRespository.getUsers();
        let c = await this.behaviorRespository.getUsersCount();
        console.log("Users count:" + c);
        res.json(users)
    }
    async getStudent(req, res) {
        console.log("I received Student ID: "+req.params.studentID)
        this.behaviorRespository.getStudentByID(req.params.studentID)
            .then(s => {
                if (s) {
                    console.log(s);
                    res.json(s)
                }
                else {
                    res.status(404).send('no Student is found')
                }
            })
            .catch(err => res.status(500).send(err))
    }

}

module.exports = new behaviorController();