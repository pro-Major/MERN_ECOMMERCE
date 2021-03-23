//Creating and Sending JWT token and saving in a Cookie.
const sendToken = (user,statuscode,res) => {
    //Creating JWT Token 
    const token = user.getJwtToken();

    //Option for Cookie 
    const options = { 
        expires : new Date(
        Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
        ),
        httponly : true, //to make cookie HTTP only 
    }
    res.status(statuscode).cookie('token',token,options).json({ 
        sucess : true,
        token,
        user
    })

}
module.exports = sendToken;