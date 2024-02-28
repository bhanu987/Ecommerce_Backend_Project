/*
Create a middleware which checks whether request body is proper and correct */
const user_model = require('../models/user.model') 

const verifySignUpBody = async (req,res,next)=>{

    try{
        //check  for name

        if(!req.body.name){
            return res.status(400).send({
                msg:"Failed! Name was not provided in request body"
            })
        }


        //check  for email
        if(!req.body.email){
            return res.status(400).send({
                msg:"Failed! Email was not provided in request body"
            })
        }


        //check  for userID
        if(!req.body.userID){
            return res.status(400).send({
                msg:"Failed! userID was not provided in request body"
            })
        }


        //check  if the user with same 
        const user = await user_model.findOne({userID:req.body.userID})

        if(user)
        {
            return res.status(400).send({
                msg:"Failed! user with same ID is already present"
            })
        }

        next()

    }
    catch(err)
    {
        console.log("Error while validating the request object",err)
        res.status(500).send({
            message :"Error while validating the request body "
        })
    }
}

module.exports = {
    verifySignUpBody : verifySignUpBody
}