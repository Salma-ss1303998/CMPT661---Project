let loggedUser = "";

class behaviorController {

    constructor() {
        this.behaviorRespository = require('../models/behaviorRepository')
    }

    login(req, res) {
        const loginInfo = req.body
        //console.log("app.post(login).req.body", loginInfo)

        this.behaviorRespository.login(loginInfo.username, loginInfo.password).then(user => {
            req.session.user = user
            loggedUser=req.session.user;
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

    async logout(req, res) {
        req.session.destroy(() => {
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

        if (incident.attachments || incident.attachmentTitle || incident.attachmentAddedOn || incident.attachmentUrl)
            await this.behaviorRespository.addAttachmentToIncident(newIncident, newAttachment._id);

        if (incident.penalties || incident.penaltyAddedOn || incident.penaltyType || incident.penaltyDescription)
            await this.behaviorRespository.addPenaltyToIncident(newIncident, newPenalty._id);

        if (incident.notes || incident.noteTitle || incident.noteAddedOn || incident.noteBody)
            await this.behaviorRespository.addNoteToIncident(newIncident, newNote._id)


        let printIncident = await this.behaviorRespository.getIncidents();
        console.log("Incident info from DB", printIncident);

    }

    async getIncidentsData(req, res) {
        let students = null;
        //console.log( "----------",loggedUser);

        if (!loggedUser.role) { //relative
            //  console.log("I am relative")
            students = await this.behaviorRespository.getStudentRelative(loggedUser.lastName);
        }
        else {
            //   console.log("I am staff")
            students = await this.behaviorRespository.getStudents(); //get all students
        }


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


        let incidentObj = [];

        for (let i = 0; i < answer.length; i++) {
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


    async getIncidentbyDBID(req, res) {
        console.log("I received incident ID: " + req.params.id)
        this.behaviorRespository.getIncidentByID(req.params.id)
            .then(s => {
                if (s) {
                    //  console.log(s);
                    res.render('incidentDetails', {incident: s})

                }
                else {
                    res.status(404).send('no incident is found')
                }
            })
            .catch(err => res.status(500).send(err))
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

    async filterIncidentsByLocation(req, res) {
        console.log("filtering by location...")
        console.log(req.params.location, req.params.from, req.params.to)
        let incidents = await this.behaviorRespository.filterByLocation(req.params.location, req.params.from, req.params.to);
        res.render('byLocation', {location: req.params.location, incidents: incidents})

        //.then(object => res.json(object))
        //.catch(err => console.log(err))
        this.behaviorRespository.filterByLocation(req.params.location, req.params.from, req.params.to)
            .then(object => res.json(object))
            .catch(err => console.log(err))
    }

    async filterIncidentsByGrade(req, res) {
        console.log("filtering by grade...")
        console.log(req.params.grade, req.params.from, req.params.to)
        this.behaviorRespository.filterByGrade(req.params.grade, req.params.from, req.params.to)
            .then(object => res.json(object))
            .catch(err => console.log(err))
    }

    async filterIncidentsByType(req, res) {
        console.log("filtering by type...")
        console.log(req.params.type, req.params.from, req.params.to)
        let incidents = await this.behaviorRespository.filterByType(req.params.type, req.params.from, req.params.to);
        res.render('byType', {type: req.params.type, incidents: incidents})

        //.then(object => res.json(object))
        // .catch(err => console.log(err))
    }

    async getIncidents(req, res) {
        let incidentsByGrade = await this.behaviorRespository.getCountByType(null, null);
        console.log("in controller : grade " + incidentsByGrade.length + "\n" + incidentsByGrade)

        let incidentsByLocation = await this.behaviorRespository.getCountByType(null, null);
        console.log("in controller : location " + incidentsByLocation.length+ "\n" + incidentsByLocation)

        let incidentsByType =await this.behaviorRespository.getCountByType(null, null);
        console.log("in controller : type " + incidentsByType.length+ "\n" + incidentsByType)

        res.render('reports', {
            incidentsByGrade: incidentsByGrade,
            incidentsByLocation: incidentsByLocation,
            incidentsByType: incidentsByType
        })
        this.behaviorRespository.filterByType(req.params.type, req.params.from, req.params.to)
            .then(object => res.json(object))
            .catch(err => console.log(err))
    }

}

module.exports = new behaviorController();