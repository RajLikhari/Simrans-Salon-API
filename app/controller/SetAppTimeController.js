const DatabaseService = require('./DatabaseService')
const MongoService = new DatabaseService()

module.exports = (req,res) => {
    const toSplit = req.query.time
    const timeValues = toSplit.toString().split("/")
    //Need to find the ID first else create it, id stays static

    const promise = MongoService.saveTimeToDB(result)





    
   
}