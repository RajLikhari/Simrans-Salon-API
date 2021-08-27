const DatabaseService = require('./DatabaseService')
const MongoService = new DatabaseService()

module.exports = (req,res) => {
    const toSplit = req.query.time
    const result = toSplit.toString().split("/")
    const promise = MongoService.saveTimeToDB(result)
   
}