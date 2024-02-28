/* This will be starting file of project */

const express = require('express')
const mongoose = require('mongoose')
const server_config = require("./configs/server.config")
const user_model = require("./models/user.model")
const db_config = require("./configs/db.config")

const bcrypt = require('bcryptjs')
const app = express();

app.use(express.json()) //middleware


/* Create an admin user at the start of application if not present */

/*Connection with MOngoDB*/

mongoose.connect(db_config.DB_URL)

const db = mongoose.connection

db.on("error",()=>{
   console.log("Error on connection with MongoDB")
})

db.once("open",()=>{
    console.log("Connected with MongoDB")
    init();
})

async function init()
{
    try{
        let user =  await user_model.findOne({userID : "admin"})
        if(user)
        {
            console.log("Admin is already present")
            return 
        }
    }
    catch(err){
console.log("Error while reading data ", err)
    }
   
   
    try{
        user = await user_model.create({
            name:"Bhanu",
            userID:"admin",
            email:"bhanupratapjaiswal16@gmail.com",
            userType:"ADMIN",
            password:bcrypt.hashSync("Welcome1",8)
        })
        console.log("Admin created ",user)
    }

    catch(e){
        console.log("Error while creating admin "+ e)
    }

}


//Stitch the routes to server

//calling routes and passing app object
require('./routes/auth.route')(app)

/*Start the server */



app.listen(server_config.PORT,()=>{

    console.log("Server started at : "+server_config.PORT)
})
