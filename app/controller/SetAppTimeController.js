const DatabaseService = require('./DatabaseService')
const MongoService = new DatabaseService()

module.exports = (req,res) => {
    const toSplit = req.query.time
    const timeValues = toSplit.toString().split("/")
    
    //First finding based on static id
    const idCheck = MongoService.findTimeInDB();
    idCheck.then(function(result){
        if(result == null){ //Means that it does not exist
            console.log("Unable to find time entry")
            const createTime = MongoService.saveTimeToDB(timeValues);
            createTime.then(function(result){
                if(result instanceof error){
                    res.status(400).send("error")
                } else {
                    res.status(200).send("Time set")
                }
            })

        } else { //Means that it does exist
            console.log("Found time entry");
            const updateTime = MongoService.UpdateTimeInDB(timeValues);
            updateTime.then(function(result){
                if(result instanceof error){
                    res.status(400).send("error")
                } else {
                    res.status(200).send("Time set")
                }
            })
        }

    })
}