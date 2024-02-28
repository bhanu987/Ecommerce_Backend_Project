/*
POST localhost:8080/ecomm/api/v1/auth/signup

I need to intercept this request
*/
//If app gets a post call hand it over to controller

const authController = require("../controllers/auth.controller")

module.exports = (app)=>{
   app.post("/ecomm/api/v1/auth/signup",authController.signup)
}
