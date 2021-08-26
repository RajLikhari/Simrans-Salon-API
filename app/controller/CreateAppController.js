const Client = require('../models/ClientClass')
const MailService = require('./MailService.js')
const DatabaseService = require('./DatabaseService.js')
const db = new DatabaseService() //This is for the database
const mailer = new MailService() //This is for send emails



module.exports = (req,res) => {
    const newClient = new Client(req.body.firstName, req.body.lastName, req.body.email, req.body.phoneNumber, req.body.appointmentDate, req.body.serviceType, req.body.servicePrice, req.body.serviceTime)
    db.saveClientToDB(newClient);
    mailer.sendCreatedAppointmentMail(newClient)
}