const express = require('express');
const bodyParser = require('body-parser');
const session =	require('express-session')
const cookieParser = require('cookie-parser');
const handlebars = require('express-handlebars');
const mongoose = require('mongoose');
const app = express();


mongoose.Promise = global.Promise;

const behvaiorController = require('./controllers/behaviorController');

app.use( express.static( __dirname ) );
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use( cookieParser() );
app.engine( 'hbs', handlebars( {defaultLayout: 'main', extname: '.hbs'} ) );
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
const idleTimeoutMilliseconds = 20 * 60 * 1000 //20 minutes
app.use( session( {
    secret: 'mysecret',
    saveUninitialized: false, resave: false,
    cookie: { maxAge: idleTimeoutMilliseconds }
}) )
//Middleware to intercept requests and redirect to the login page if the user is not logged-in
function isAuthenticated(req, res, next) {
    if (!req.session.user) {
        //Store this Url to redirect to it after successful login
        req.session.prevUrl = req.originalUrl;
        console.log('User not logged-in', req.session.user)
        res.render('login')
    } else {
        return next()
    }
}

app.use( (req, res, next) => {
    if (req.session.user) {
        //Allows accessing Express.js session from handlebars template
        res.locals.session = req.session;
    }
    return next();
});
/* modules routes */
const port = 3322;
const dbConnection = mongoose.connect('mongodb://localhost/behavior', function(err) {
    if (err) {
        console.log("Failed to connect to monogoDb " + err);
        return;
    }
    else {
        behvaiorController.initDb();
        app.listen(port, () => {
            console.log(`School Management System App:Behavior running on http://localhost:${port}`)
        })
    }
});
app.get('/', (req, res) => res.render('login'))
<<<<<<< HEAD
app.get('/AY',(req,res)=> behvaiorController.getIncidents(res,res))//.render('reports'))
app.get('/index', (req, res) => res.render('index'))
=======
<<<<<<< HEAD
=======
>>>>>>> 2de8e338127ea729a79643c5d482849076ec09f1
>>>>>>> a2f6c042c3b6d8c6278f5831eb1d61ee389ab748
app.get('/AY',(req,res)=>res.render('reports'))
app.get('/index', isAuthenticated,(req, res) => res.render('index'))
>>>>>>> 8a6a8f1a56012fe20ff81b4cfcc20f1ac2d1addf
app.post('/login', (req, res) => behvaiorController.login(req, res))
app.get('/api/staffs', (req, res) => behvaiorController.getStaffs(req, res));
app.get('/api/relatives', (req, res) => behvaiorController.getRealtives(req, res));
app.get('/api/students', (req, res) => behvaiorController.getStudents(req, res));
app.get('/api/academicYears', (req, res) => behvaiorController.getAcademicYears(req, res));
app.get('/api/status', (req, res) => behvaiorController.getStatus(req, res));
app.get('/incidents', isAuthenticated,(req, res) => behvaiorController.getIncidentsData(req, res))
<<<<<<< HEAD

// app.get('/incidents', (req, res) => behvaiorController.getIncidentsData(req, res))
=======
app.get('/incidents', (req, res) => behvaiorController.getIncidentsData(req, res))
>>>>>>> 023c05622a4f937cecbab9175d1833ffe9a1957b
app.get('/incidentEditor', (req, res) => behvaiorController.editIncident(req, res))
app.get('/api/students/:studentID',(req, res) =>  behvaiorController.getStudent(req, res));
app.post('/incidentEditor', (req, res) => behvaiorController.addIncident(req, res))
app.get('/api/incidents/:studentID',(req, res) =>  behvaiorController.getStudentIncidents(req, res));
app.get('/api/countByLocation/:from/:to',(req, res) =>  behvaiorController.getCountByLocation(req, res));
app.get('/api/countByType/:from/:to',(req, res) =>  behvaiorController.getCountByType(req, res));
app.get('/api/countByGrade/:from/:to',(req, res) =>  behvaiorController.getCountByGradeLevel(req, res));
app.get('/api/incident/:id',(req, res) =>  behvaiorController.getIncidentbyDBID(req, res));
app.get('/api/incidents/location/:location/:from/:to', (req,res) => behvaiorController.filterIncidentsByLocation(req,res));
// app.get('/api/incidents/location/:location/:from/:to', (req, res) => res.render('byLocation'))

app.get('/api/incidents/grade/:grade/:from/:to', (req,res) => behvaiorController.filterIncidentsByGrade(req,res));
app.get('/api/incidents/type/:type/:from/:to', (req,res) => behvaiorController.filterIncidentsByType(req,res));
app.get('/logout', (req, res) => behvaiorController.logout(req, res))





