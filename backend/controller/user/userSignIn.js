const bcrypt = require('bcryptjs')
const userModel = require('../../models/userModel')
const jwt = require('jsonwebtoken');

async function userSignInController(req,res){
    console.log(`Signing in user`.yellow)
    try{
        const { email , password} = req.body

        if(!email){
            throw new Error("Please provide email")
        }
        if(!password){
             throw new Error("Please provide password")
        }

        const user = await userModel.findOne({email})
        

       if(!user){
            throw new Error("User not found")
       }

       const checkPassword = bcrypt.compare(password, user.password)

       if(checkPassword){
        const tokenData = {
            _id : user._id,
            email : user.email,
        }
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 8 });


        const tokenOption = {
            httpOnly : true,
            secure : true
        }

        console.log(`User: ${email} successfully signed in`.blue)
        res.cookie("token",token,tokenOption).status(200).json({
            message : "Login successfully",
            data : token,
            success : true,
        })

       }else{
         throw new Error("Please check Password")
       }

    }catch(err){
        console.log(`Error logging in: ${err.message}...`.red)
        res.json({
            message : err.message || err  ,
            error : true,
            success : false,
        })
    }

}

module.exports = userSignInController