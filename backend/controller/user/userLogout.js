async function userLogout(req,res){
    try{
        res.clearCookie("token")

        console.log("Successfully logged out...".magenta)
        res.json({
            message : "Logged out successfully",
            success : true,
            data : []
        })
    }catch(err){
        console.log(`Error logging out:  ${err.message}...`.red)
        res.json({
            message : err.message || err  ,
            error : true,
        })
    }
}


module.exports = userLogout