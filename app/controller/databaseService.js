const mongoose = require('mongoose');
const { Schema } = mongoose;
const BookingInfo = require('../models/BookingInfoSchema.js')

//How it defines within the collection


class DatabaseService{
    
    //The purpose of this function is to save a new client to the database
    async saveClientToDB(newClient){
        const addClient = await BookingInfo.create({firstName: newClient.firstName, lastName: newClient.lastName, email: newClient.email, phoneNumber: newClient.phoneNumber, appointmentDate: newClient.appointmentDate, serviceType: newClient.serviceType, servicePrice: newClient.servicePrice, serviceTime: newClient.serviceTime, uniqueId: newClient.uniqueId, passwordForCancel: newClient.passwordForCancel})
    }

    async findClientInDB(uniqueIdIncoming){
        try{
            let client = await BookingInfo.findOne({ uniqueId: uniqueIdIncoming})
            return client
        } catch(error){
            throw error
        }
    }



}


module.exports = DatabaseService;
