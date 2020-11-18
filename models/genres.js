const mongoose =require('mongoose')
const Joi =require('joi')
 Joi.ObjectId=require("joi-objectid")(Joi)


const schema =new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 15
    },

    movies:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"movies"
    },

    date: {
        type: Date,
        default: Date.now()
    },


})

const Genres = mongoose.model("genre",schema )

function validation(body){
const schemaJ =Joi.object({
    name:Joi.string().min(3).max(14).required(),
    movies:Joi.ObjectId()
    
})

return schemaJ.validate(body)
}

exports.Genres=Genres
exports.validation=validation