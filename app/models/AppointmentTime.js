const mongoose = require('mongoose');
const Schema  = mongoose.Schema;


const AppointmenTimeSchema = new Schema({
    time: [String]

},
{ collection: 'appointment-times' })

const AppointmentTime = mongoose.model('AppointmentTimeSchema', AppointmenTimeSchema)
module.exports = AppointmentTime
