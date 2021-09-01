const BookingInfo = require('../models/BookingInfoSchema.js')
const AppointmentTime = require('../models/AppointmentTime')


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

    async saveTimeToDB(incomingTime){
        try{
            const saveTime = await AppointmentTime.create({time: incomingTime, staticId: "1"})
            return saveTime
        } catch(error){
            throw error
        }
    }

    async findTimeInDB(){
        try{
            const findTime = await AppointmentTime.findOne({staticId: "1"})
            return findTime
        } catch (error){
            throw error
        }
    }

   async UpdateTimeInDB(incomingTime){
       try{
           const updateTime = await AppointmentTime.findOneAndUpdate({staticId: "1"}, {time: incomingTime})
           return updateTime
       } catch (error){
           throw error
       }
   }




}


module.exports = DatabaseService;
