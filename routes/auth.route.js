/*
POST localhost:8080/ecomm/api/v1/auth/signup

I need to intercept this request
*/
//If app gets a post call hand it over to controller

const authController = require("../controllers/auth.controller")

const authMW = require("../middlewares/auth_middleware")

module.exports = (app)=>{
   app.post("/ecomm/api/v1/auth/signup",[authMW.verifySignUpBody],authController.signup)
}
