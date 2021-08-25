const nodemailer = require('nodemailer')
const { google } = require('googleapis')
const express = require('express')
var bodyParser = require('body-parser')
const Handlebars = require("handlebars");
const hbs = require('nodemailer-express-handlebars');
const { template } = require('handlebars');

//Google API Information for GMAIL API
const CLIENT_ID = '331517253694-jkvqlq5c7d2d3ckomfrvke8fn9il91h9.apps.googleusercontent.com'
const CLIENT_SECRET = 'UianSomxRMCBQIviVAzMPohq'
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN = '1//04Zadt51AlPA-CgYIARAAGAQSNwF-L9Iri9lwy2DRjY3D6VYExxlxY6WVsdvGZ6DH7zI7RXTDGekgSD7fOpl0k8BNdwC7TwrAkHE'

const OAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
OAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN});

//Standard information for setting up express API
const app = express()
const port = 3000
app.use(bodyParser.json())


//Handling all routes
//GET for handling incoming appointments and sending the email for it
app.post('/createAppointment', (req, res) => {
    // firstName = req.body.firstName
    // lastName = req.body.lastName
    // email = req.body.email
    // phoneNumber = req.body.phoneNumber
    // appointmentDate = req.body.appointmentDate
    // serviceType = req.body.serviceType
    // servicePrice = req.body.servicePrice
    // serviceTime = req.body.serviceTime
    sendMail();


})


//Listening for the server
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})






async function sendMail() {
    try{
        const accessToken = await OAuth2Client.getAccessToken();

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: "simranssalon.usa@gmail.com",
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
        })

        transport.use('compile', hbs({
            viewEngine: 'express-handlebars',
            viewPath: './views/'
        }));

        const mailOptions = {
            from: 'simranssalon.usa@gmail.com',
            to: "arvind8106@gmail.com, Varvind@tamu.edu",
            subject: 'Simran\'s Salon Appointment Confirmation',
            template: 'appoint'
        };

        const result = await transport.sendMail(mailOptions)
        console.log(result)
        return result

    } catch (error){
        console.log(error)
        return error
    }
}



