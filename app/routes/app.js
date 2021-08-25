const express = require('express')
var bodyParser = require('body-parser')
const MailService = require('../controller/mailService.js')
const Client = require('../models/client.js')
const path = require('path');



//Standard information for setting up express API
const app = express()
const port = 3000
app.use(bodyParser.json())
const mailer = new MailService() //This is for send emails
app.use(express.static(path.join(__dirname, 'static')))



//Handling all routes
//POST for handling incoming appointments and sending the email for it
//FIXME: Need to check database for available timing before entering or else conflict
//FIXME: Need to generate a password which binds to a specific entry
app.post('/createAppointment', (req, res) => {
    const newClient = new Client(req.body.firstName, req.body.lastName, req.body.email, req.body.phoneNumber, req.body.appointmentDate, req.body.serviceType, req.body.servicePrice, req.body.serviceTime)
    mailer.sendCreatedAppointmentMail(newClient)
})

//GET for handling canceling appointments
app.get('/cancelAppointment', (req, res) => {
    res.sendFile(__dirname + '/static/delApp.html')
})


//Listening for the server
app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
})










