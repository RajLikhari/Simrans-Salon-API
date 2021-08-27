//import
const DatabaseService = require('./DatabaseService')

//delcarations
const MongoService = new DatabaseService()



module.exports = (req,res) => {
   const prom =  MongoService.saveTimeToDB()
   prom.then(function(result){
       console.log(result)
   })

}