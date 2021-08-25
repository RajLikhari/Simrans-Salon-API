const nodemailer = require('nodemailer')
const { google } = require('googleapis')
const hbs = require('nodemailer-express-handlebars');

//Google API Information for GMAIL API
const CLIENT_ID = '331517253694-jkvqlq5c7d2d3ckomfrvke8fn9il91h9.apps.googleusercontent.com'
const CLIENT_SECRET = 'UianSomxRMCBQIviVAzMPohq'
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN = '1//04Zadt51AlPA-CgYIARAAGAQSNwF-L9Iri9lwy2DRjY3D6VYExxlxY6WVsdvGZ6DH7zI7RXTDGekgSD7fOpl0k8BNdwC7TwrAkHE'

const OAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
OAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN});


class MailService {

    async sendCreatedAppointmentMail(newClient) {
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
    
            transport.use(
                "compile",
                hbs({
                      viewEngine: {
                  extname: '.handlebars', // handlebars extension
                  layoutsDir: 'emails', // location of handlebars templates
                  defaultLayout: 'appointmentCreated', // name of main template
              },
              viewPath: 'emails',
              extName: '.handlebars',
                })
            );
            const mailOptions = {
                from: 'simranssalon.usa@gmail.com',
                to: newClient.email,
                subject: 'Simran\'s Salon Appointment Confirmation',
                template: 'appointmentCreated',
                context: {
                    firstName: newClient.firstName,
                    lastName: newClient.lastName,
                    appointmentDate: newClient.appointmentDate,
                    serviceType: newClient.serviceType,
                    servicePrice: newClient.servicePrice,
                    serviceTime: newClient.serviceTime,
                    phoneNumber: newClient.phoneNumber
                }
            };
    
            const result = await transport.sendMail(mailOptions)
            console.log(result)
            return result
    
        } catch (error){
            console.log(error)
            return error
        }
    }



}



module.exports = MailService;