const mongoose =require('mongoose')
const Joi =require('joi')
Joi.ObjectId =require("joi-objectid")(Joi)



const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 15
    },
    description:{
        type:String,
        required:true,
        minlength:30,
        maxlength:1000
    },

    date: {
        type: Date,
        default: Date.now()
    },


})

const Movies = mongoose.model("movies",schema )

function Validate(body){
    const schemaM = Joi.object({
        id:Joi.ObjectId(),
        name:Joi.string().min(3).max(50).required(),
        description:Joi.string().min(30).max(1000).required()
      
    })
    return schemaM.validate(body)
}

exports.validateMov=Validate
exports.Movies=Movies
exports.schemaM=schema