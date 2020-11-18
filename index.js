const user =require("./router/user")
const movies =require("./router/movies")
const genres = require("./router/genres")
const auth =require("./router/auth")

const config =require("config")
const express = require('express')


const app = express()

if(!config.get("ThisIsPrivateKey")){
    console.log("Private key is not set")
    process.exit(1)
}


require("./startup/connection")()


app.use(express.json())
app.use("/api/genres",genres)
app.use("/api/movies",movies)
app.use("/api/users",user)
app.use("/api/auth",auth)






const port = process.env.PORT || 3010

app.listen(port, () => console.log(`listening on port ${port}....`))
