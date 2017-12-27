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

    async logout(req, res) {
        req.session.destroy( () => {
            res.redirect('/')
        })
    }

    async addIncident(req, res) {
        const incident = req.body;
        console.log("app.post(/incidentEditor).req.body", incident)

        let newIncident = await this.behaviorRespository.addIncident(incident);
        let newAttachment = await this.behaviorRespository.addAttachment(incident);
        //let newStudent= await this.behaviorRespository.addStudent(incident);
        let newPenalty = await this.behaviorRespository.addPenalty(incident);
        let newNote = await this.behaviorRespository.addNote(incident);

        await this.behaviorRespository.addAttachmentToIncident(newIncident, newAttachment._id);
        //await this.behaviorRespository.addStudentToIncident(newIncident, newStudent._id);
        await this.behaviorRespository.addPenaltyToIncident(newIncident, newPenalty._id);
        await this.behaviorRespository.addNoteToIncident(newIncident, newNote._id)


        //let printIncident = await this.behaviorRespository.getIncidents();
        // console.log("Incident info from DB", printIncident);

    }

    async getIncidentsData(req, res) {
        let students = await this.behaviorRespository.getStudents();
        let academicYears = await this.behaviorRespository.getAcademicYears();
        let incidents = await this.behaviorRespository.getIncidents();
        res.render('incidents', {students: students, academicYears: academicYears, incidents: incidents})
    }

    async editIncident(req, res) {
        let students = await this.behaviorRespository.getStudents();
        let academicYears = await this.behaviorRespository.getAcademicYears();
        let incidentTypes = await this.behaviorRespository.getIncidentType();
        let locations = await this.behaviorRespository.getLocation();
        let statuses = await this.behaviorRespository.getStatus();
        let staffs = await this.behaviorRespository.getStaffs();
        let penaltyTypes = await this.behaviorRespository.getPenaltyType();
        res.render('incidentEditor', {
            students: students,
            academicYears: academicYears,
            incidentType: incidentTypes,
            locations: locations,
            status: statuses,
            staffs: staffs,
            studentsReporter: students,
            penaltyTypes: penaltyTypes
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
        console.log("I received Student ID: " + req.params.studentID)
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
    async getStudent(req, res) {
        console.log("I received Student ID: " + req.params.studentID)
        this.behaviorRespository.getStudentByID(req.params.studentID)
    }
    async getStudentIncidents(req, res) {
        console.log("I received Student ID: " + req.params.studentID);
        let answer = await this.behaviorRespository.getStudentIncidents(req.params.studentID)
            .then(s => {
                if (s) {
                    return s;
                }
                else {
                    res.status(404).send('no Student is found')
                }
            })
            .catch(err => res.status(500).send(err))


        let incidentObj =[];

        for (let i=0;i<answer.length;i++) {
            incidentObj.push(await this.behaviorRespository.getIncidentByID(answer[i]._id));

            let locationObj = await this.behaviorRespository.getLocationByID(answer[i].location);
            let location = locationObj.location;
            incidentObj[i].location = location;

            let IncidentTypeObj = await this.behaviorRespository.getIncidentTypeByID(answer[i].type);
            let incidentType = IncidentTypeObj.type;
            incidentObj[i].type = incidentType;
        }

        res.json(incidentObj)
    }


    async getCountByGradeLevel(req, res) {
        console.log("Getting count by Grade Level (Controller)")
        console.log(req.params.from, req.params.to)
        this.behaviorRespository.getCountByGradeLevel(req.params.from, req.params.to)
            .then(object => res.json(object))
            .catch(err => console.log(err))
    }


    async getCountByLocation(req, res) {
        console.log("Getting count by location (Controller)")
        console.log(req.params.from, req.params.to)
        this.behaviorRespository.getCountByLocation(req.params.from, req.params.to)
            .then(object => res.json(object))
            .catch(err => console.log(err))

    }

    async getCountByType(req, res) {
        console.log("Getting count by Type (Controller)")
        console.log(req.params.from, req.params.to)
        this.behaviorRespository.getCountByType(req.params.from, req.params.to)
            .then(object => res.json(object))
            .catch(err => console.log(err))
    }



}

module.exports = new behaviorController();