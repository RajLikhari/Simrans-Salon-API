const Client = require('../models/ClientClass')
const MailService = require('./MailService.js')
const DatabaseService = require('./DatabaseService.js')
const MongoService = new DatabaseService() //This is for the database
const GoogleMailer = new MailService() //This is for send emails


module.exports = (req,res) => {
    const newClient = new Client(req.body.firstName, req.body.lastName, req.body.email, req.body.phoneNumber, req.body.appointmentDate, req.body.serviceType, req.body.servicePrice, req.body.serviceTime)
    saveBooking = MongoService.saveClientToDB(newClient);
    saveBooking.then(function(result) {
        if(result == null){
            res.status(400).send("Unable to save into the database")
        } else {
            GoogleMailer.sendCreatedAppointmentMail(newClient)
            res.status(200).send("Created")
        }
    })
}