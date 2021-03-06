//imports
const express = require('express')
var bodyParser = require('body-parser')
const path = require('path');
var exphbs  = require('express-handlebars');
const  mongoose  = require('mongoose')



//module exports
const MailService = require('./controller/MailService.js')
const DatabaseService = require('./controller/DatabaseService.js')
const CreateAppController = require('./controller/CreateAppController.js')
const CancelAppController = require('./controller/CancelAppController.js')
const DeleteAppController = require('./controller/DeleteAppController.js')
const GrabTimeController = require('./controller/GrabTimeController.js')
const SetAppTimeController = require('./controller/SetAppTimeController');
const AdminController = require('./controller/AdminController.js');


//declarations
const app = express()
const mailer = new MailService()
const db = new DatabaseService() 

//app use
app.use(bodyParser.json())
app.engine('hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'static')))
app.use(express.static(path.join(__dirname, 'images')))

//MongoDb connection
mongoose.connect('mongodb://localhost/simrans-salon', {useNewUrlParser: true, useUnifiedTopology: true});
const dbMongo = mongoose.connection;


//Routes
app.post('/createAppointment', CreateAppController)
app.get('/cancelAppointment', CancelAppController)
app.get('/deleteAppointment', DeleteAppController)
app.get('/setAppointmentTime', SetAppTimeController)
app.get('/grabAppointmentTime', GrabTimeController)
app.get('/admin', AdminController);

//Listening for the server
app.listen(3000, () => {
    console.log(`app listening at http://localhost:3000`)
})










