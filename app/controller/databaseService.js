const BookingInfo = require('../models/BookingInfoSchema.js')


class DatabaseService{
    
    async saveClientToDB(newClient){
        try{
            const saveBooking = await BookingInfo.create({firstName: newClient.firstName, lastName: newClient.lastName, email: newClient.email, phoneNumber: newClient.phoneNumber, appointmentDate: newClient.appointmentDate, serviceType: newClient.serviceType, servicePrice: newClient.servicePrice, serviceTime: newClient.serviceTime, uniqueId: newClient.uniqueId, passwordForCancel: newClient.passwordForCancel})
            return saveBooking
        } catch(error){
            throw error
        }
    }

    async findClientInDB(uniqueIdIncoming){
        try{
            let foundBooking = await BookingInfo.findOne({ uniqueId: uniqueIdIncoming})
            return foundBooking
        } catch(error){
            throw error
        }
    }

    async deleteInDB(uniqueIdIncoming){
        try{
            let deleteBooking = await BookingInfo.deleteOne({uniqueId: uniqueIdIncoming})
            return deleteBooking

        } catch(error){
            throw error
        }
    }



}


module.exports = DatabaseService;
