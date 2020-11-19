const asyncMiddle =require("../middleware/async")
const auth =require("../middleware/auth")
const {validateMov ,Movies} =require("../models/movies")

const express = require("express")

const router = express.Router()

router.get("/",asyncMiddle(async (req,res)=>{
  const result = await Movies.find()
  res.send(result)
}))


router.post("/",auth, asyncMiddle(async (req,res)=>{
    const {error} = validateMov(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const movie =new Movies({
        name:req.body.name
    })

   await movie.save()
   res.send(movie)
}))


router.put("/:id",auth ,asyncMiddle( async(req ,res)=>{
  let  {error} = validateMov(req.body)
  if (error) return res.status(400).send(error.details[0].message)
  
  const movie = await Movies.findByIdAndUpdate(req.params.id, {
        $set: {
            name: req.body.name,
            description:req.body.description
        },

    }, 
    {
      new: true
    })

    res.send(movie)
  

}))



router.delete("/:id",auth,asyncMiddle(async(req,res)=>{
  const movie = await Movies.findByIdAndRemove(req.params.id)
  res.send(movie)


}))



module.exports = router