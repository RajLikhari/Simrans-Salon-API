//imports
const DatabaseService = require('./DatabaseService');

//declarations
const MongoSerivce = new DatabaseService()

module.exports = (req,res) => {
    console.log("Got cancellation")
    clientId = req.query.id
    foundBooking = MongoSerivce.findClientInDB(clientId)
    foundBooking.then(function(result){
        if(result == null){
            res.status(404).send("Booking not found")
        } else {
            let passwordToCheck = req.query.pass
            let bookingPassword = result.passwordForCancel
            if(passwordToCheck.localeCompare(bookingPassword) != 0){
                res.status(404).send("Invalid password")
            } else {
                res.render('delApp', {
                    firstName: result.firstName,
                    lastName: result.lastName
                })
            }
        }
    })
}