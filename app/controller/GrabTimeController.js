//import
const { response } = require('express')
const DatabaseService = require('./DatabaseService')

//delcarations
const MongoService = new DatabaseService()



module.exports = (req,res) => {
    const AppointmentTimes = MongoService.findTimeInDB()
    AppointmentTimes.then(function(promResult){
        if(promResult == null){
            res.staus(400)
        } else {
            const arrOfTime = promResult.time;
            const dateToCheck = req.query.date
    
            const GrabDayDates = MongoService.findDatesInDB(dateToCheck);
            GrabDayDates.then(function(promResult) {
                const result = promResult
                if(result.length == 0){
                    res.status(200).send(arrOfTime)
                } else {
                    for(let i = 0; i < result.length; i++){
                        for(let j = 0; j < arrOfTime.length; j++){
                            if(result[i].serviceTime == arrOfTime[j]){
                                arrOfTime.splice(j,1)
                            }
                        }
                    }

                    res.status(200).send(arrOfTime)
                }
            })
    
        }
    })
    
}