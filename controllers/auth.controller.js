/*
    We need to write the logic / controller to
    register a user
*/

const bcrypt = require('bcryptjs')
const user_model = require('../models/user.model')
const jwt = require('jsonwebtoken')
const secret = require('../configs/auth.config')

exports.signup = async (req,res)=>
{

    // Logic to create a user 
        
    // 1. Read the request body
    const req_body = req.body;
    //Return the JS object
    console.log(req_body)

    //2. Inset data into Users  collection in MongoDB

    const userObj = {
        name : req_body.name,
        userID : req_body.userID,
        email : req_body.email,
        userType : req_body.userType,
        password : bcrypt.hashSync(req_body.password,8)
    }
    try{
      const user_created =   await user_model.create(userObj)

      //Return this user
      const res_obj = {
        name : user_created.name,
        userID : user_created.userID,
        email  : user_created.email,
        userType : user_created.userType,
        createdAt : user_created.createdAt,
        updatedAt :user_created.updatedAt
      }
      res.status(201).send(res_obj)
    }
    catch(err)
    {
        console.log('Error while registering user ',err)
        res.status(500).send({
            message : "Some error happened while registering the user"
        })
    }

    // 3. Send the response to user


}

exports.signin = async(req,res)=>{

    //Check if the userID is present in the system
   const user = await  user_model.findOne(
        {
            userID:req.body.userID
        }
    )
if(user == null){
   return res.status(400).send({
        msg:"UserId passed is not valid"
    })
}

    //check if password is correct
const isPasswordValid = bcrypt.compareSync(req.body.password,user.password) 
//it return a boolean value - true or false

if(!isPasswordValid){
   return res.status(401).send({msg:"Password is incorrect"})
}

    //using jwt we will create a access token with a given TTL and return

    const token =jwt.sign({id: user.userID },secret.secret,{
expiresIn : 120
    })


    res.status(200).send({
        name:user.name,
        userID : user.userID,
        email: user.email,
        userType : user.userType,
        acesstoken : token

    })
}