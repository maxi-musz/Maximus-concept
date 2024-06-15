const userModel = require("../../models/userModel")

async function userDetailsController(req,res){
    console.log("Getting user details...")
    try{
        const user = await userModel.findById(req.userId)
        console.log("User details successfully retrieved".blue)
        res.status(200).json({
            data : user,
            success : true,
            message : "User details"
        })

    }catch(err){
        console.log(`Error retrieving user details: ${err.message}`)
        res.status(400).json({
            message : `Error getting user details: ${err.message || err}`,
        })
    }
}

module.exports = userDetailsController