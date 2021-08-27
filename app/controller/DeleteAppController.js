const DatabaseService = require("./DatabaseService")
const MongoService = new DatabaseService()


module.exports = (req, res) => {
    uniqueId = req.query.id
    result = MongoService.findClientInDB(uniqueId)
    result.then(function(result){
        if(result == null){
            res.status(400).send("Not found")
        } else {
            passToCheck = result.passwordForCancel
            if(passToCheck.localeCompare(req.query.pass) != 0){
                res.status(400).send("Invalid Password")
            } else {
                deleteResult = MongoService.deleteInDB(uniqueId)
                deleteResult.then(function(result){
                    if(result != null){
                        res.status(200).send("Confirmed")
                    } else {
                        res.staus(400).send("failed")
                    }
                })
            }
        }
    })




}