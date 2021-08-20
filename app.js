const nodemailer = require('nodemailer')
const { google } = require('googleapis')

const CLIENT_ID = '331517253694-jkvqlq5c7d2d3ckomfrvke8fn9il91h9.apps.googleusercontent.com'
const CLIENT_SECRET = 'UianSomxRMCBQIviVAzMPohq'
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN = '1//04Zadt51AlPA-CgYIARAAGAQSNwF-L9Iri9lwy2DRjY3D6VYExxlxY6WVsdvGZ6DH7zI7RXTDGekgSD7fOpl0k8BNdwC7TwrAkHE'

const OAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
OAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN});

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

        const mailOptions = {
            from: 'simranssalon.usa@gmail.com',
            to: 'simran.likhari22@gmail.com',
            subject: 'Testing Email',
            text: 'Hello from gmail email using API',
            html: '<h1>Hello from gmail email using API</h1>'
        };

        const result = await transport.sendMail(mailOptions)
        return result

    } catch (error){
        return error
    }


}


sendMail()
    .then((result) => console.log("email sent...", result))
    .catch((error => console.log(error.message)))
