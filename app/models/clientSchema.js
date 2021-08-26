import mongoose from 'mongoose';
const { Schema } = mongoose;

//How it defines within the collection
const ClientSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: String,
    appointmentDate: Date,
    serviceType: String,
    servicePrice: String,
    serviceTime: String,
    uniqueId: String,
    passwordForCancel: String

})
  