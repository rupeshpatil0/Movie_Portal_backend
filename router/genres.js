const asyncMiddle =require("../middleware/async")
const auth =require("../middleware/auth")
const { Genres, validation } = require("../models/genres")
const express = require("express")
const router = express.Router()




router.get("/", asyncMiddle(async (req, res) => {
    const genres = await Genres
        .find()
        .populate("movies", "name -_id")

    res.send(genres)
}))


router.post("/",auth,asyncMiddle((req, res) => {
    const { error } = validation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const genre = new Genres({
        name: req.body.name,
        movies: req.body.movies
    })

    genre.save()
        .then(() => console.log("succesfully saved"))
        .catch((err) => console.log("err ocurred...", err.message))
    res.send(genre)
}))



router.put("/:id",auth,asyncMiddle(async (req, res) => {
    const { error } = validation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const genre = await Genres.findByIdAndUpdate(req.params.id, {
        $set: {
            name: req.body.name
        },

    }, {
        new: true
    })
    res.send(genre)

}))

router.delete("/:id",auth, asyncMiddle(async (req, res) => {
    const genre = await Genres.findByIdAndRemove(req.params.id)
    res.send(genre)
}))

module.exports = router

