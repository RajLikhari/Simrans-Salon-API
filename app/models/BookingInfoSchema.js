const mongoose = require('mongoose');
const Schema  = mongoose.Schema;


const BookingInfoSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: String,
    appointmentDate: String,
    serviceType: String,
    servicePrice: String,
    serviceTime: String,
    uniqueId: String,
    passwordForCancel: String

},
{ collection: 'booking-info' })

const BookingInfo = mongoose.model('BookingInfoSchema', BookingInfoSchema)
module.exports = BookingInfo
