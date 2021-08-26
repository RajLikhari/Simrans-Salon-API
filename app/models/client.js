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
    uniqueId = ''
    passwordForCancel = ''


    constructor(firstName, lastName, email, phoneNumber, appointmentDate, serviceType, servicePrice, serviceTime){
        
        var id = generator.generate({
            length: 10,
            numbers: true
        });

        var password = generator.generate({
            length: 10,
            numbers: true
        });

        this.firstName = firstName
        this.lastName = lastName
        this.email = email
        this.phoneNumber = phoneNumber
        this.appointmentDate = appointmentDate
        this.serviceType = serviceType
        this.servicePrice = servicePrice
        this.serviceTime = serviceTime
        this.passwordForCancel = password
        this.uniqueId = id
    }


}


module.exports = Client