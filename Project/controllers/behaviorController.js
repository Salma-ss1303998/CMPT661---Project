class behaviorController {

    constructor() {
        this.behaviorRespository = require('../models/behaviorRepository')
    }
    login(req, res) {
        const loginInfo = req.body
        console.log("app.post(login).req.body", loginInfo)

        this.behaviorRespository.login(loginInfo.username, loginInfo.password).then(user => {
            req.session.user = user
            res.redirect('/index')//req.session.prevUrl)
        })
            .catch(err => {
                console.log(err)
                res.render('login', {errMessage: err})
            })
    }

    async addIncident(req, res) {
        const incident = req.body;
        console.log("app.post(/incidentEditor).req.body", incident)

        let newIncident = await this.behaviorRespository.addIncident(incident);
        let newAttachment = await this.behaviorRespository.addAttachment(incident);
        //let newStudent= await this.behaviorRespository.addStudent(incident);
        let newPenalty= await this.behaviorRespository.addPenalty(incident);
        let newNote= await this.behaviorRespository.addNote(incident);

        await this.behaviorRespository.addAttachmentToIncident(newIncident, newAttachment._id);
        //await this.behaviorRespository.addStudentToIncident(newIncident, newStudent._id);
        await this.behaviorRespository.addPenaltyToIncident(newIncident,newPenalty._id);
        await this.behaviorRespository.addNoteToIncident(newIncident,newNote._id)


        let printIncident = await this.behaviorRespository.getIncident();
        console.log("Incident info from DB",printIncident);

    }

    async getIncidentsData(req, res) {
        let students = await this.behaviorRespository.getStudents();
        let academicYears = await this.behaviorRespository.getAcademicYears();
        let incidents = await this.behaviorRespository.getIncident();
        res.render('incidents', {students: students, academicYears: academicYears, incidents:incidents})
    }

    async editIncident(req, res) {
        let students = await this.behaviorRespository.getStudents();
        let academicYears = await this.behaviorRespository.getAcademicYears();
        let incidentTypes = await this.behaviorRespository.getIncidentType();
        let locations = await this.behaviorRespository.getLocation();
        let statuses=await this.behaviorRespository.getStatus();
        let staffs= await this.behaviorRespository.getStaffs();
        let penaltyTypes=  await this.behaviorRespository.getPenaltyType();
        res.render('incidentEditor', {
            students: students,
            academicYears: academicYears,
            incidentType: incidentTypes,
            locations: locations,
            status:statuses,
            staffs:staffs,
            studentsReporter: students,
            penaltyTypes:penaltyTypes
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


<<<<<<< HEAD
/*
>>>>>>> 8c8ca151fa6f133c3435382b59209c19c2f39d30
    async getStudent(req, res) {
        console.log("I received Student ID: "+req.params.studentID)
        this.behaviorRespository.getStudentByID(req.params.studentID)
=======
    async getStudentIncidents(req, res) {
        console.log("I received Student ID: "+req.params.studentID);
        this.behaviorRespository.getStudentIncidents(req.params.studentID)
>>>>>>> a32ec1df03494b880b7be566ca2df47498647584
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


    async getByGradeLevel(req, res){

    }

    async getByLocation(req,res){

    }

    async getByType(req,res){

    }



}

module.exports = new behaviorController();