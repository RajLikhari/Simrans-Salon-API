var generator = require('generate-password');

class Client {

    firstName = ''
    lastName = ''
    email = ''
    phoneNumber = ''
    appointmentDate = ''
    serviceType = ''
    servicePrice = ''
    serviceTime = ''
    passwordForCancel = ''


    constructor(firstName, lastName, email, phoneNumber, appointmentDate, serviceType, servicePrice, serviceTime){
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
        this.phoneNumber = phoneNumber
        this.appointmentDate = appointmentDate
        this.serviceType = serviceType
        this.servicePrice = servicePrice
        this.serviceTime = serviceTime

        var password = generator.generate({
            length: 10,
            numbers: true
        });

        this.passwordForCancel = password
    }


}


module.exports = Client