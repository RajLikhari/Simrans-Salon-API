const express = require('express')
var bodyParser = require('body-parser')
const MailService = require('./controller/mailService.js')
const Client = require('./models/client.js')
const path = require('path');
var exphbs  = require('express-handlebars');



//Standard information for setting up express API
const app = express()
const port = 3000
app.use(bodyParser.json())
const mailer = new MailService() //This is for send emails
app.engine('hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'static')))
app.use(express.static(path.join(__dirname, 'images')))

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/simrans-salon', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("hello")
  // we're connected!
});

//Handling all routes
//POST for handling incoming appointments and sending the email for it
//FIXME: Need to check database for available timing before entering or else conflict
//FIXME: Need to generate a password which binds to a specific entry
app.post('/createAppointment', (req, res) => {
    const newClient = new Client(req.body.firstName, req.body.lastName, req.body.email, req.body.phoneNumber, req.body.appointmentDate, req.body.serviceType, req.body.servicePrice, req.body.serviceTime)
    mailer.sendCreatedAppointmentMail(newClient)
})

//GET for handling canceling appointments, need to grab information from the mongoDb server with that password first
app.get('/cancelAppointment', (req, res) => {
    id = req.query.id
    pass = req.query.pass
    if(id.localeCompare("raj") != 0 || pass.localeCompare("raj") != 0){
        res.status(404).send("Forbidden")
        console.log(id + " " + pass)
    } else {
        res.render('delApp', {
            firstName: "Raj",
            lastName: "Likhari"
        })
    }
    
       
})


//Listening for the server
app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
})










