const mongoose =require("mongoose")
const config =require('config')

module.exports = function(){
    return mongoose.connect(config.get('db'),{ useNewUrlParser: true },{ useUnifiedTopology: true })
    .then(() => console.log("succesfully connected to database...."))
    .catch((err) => console.log("connection failed ....", err.message))
}