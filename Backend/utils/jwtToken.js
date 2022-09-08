//Saving the token in cookie
const token = (user,res, statusCode)=>{
    const authToken = user.getJWTToken();

    // Options for cookie
    const options = {
        
        expires : new Date(
            Date.now() + process.env.COOKIE_EXPIRE*24*60*60*1000
        ),
        httpOnly: true, //Now client side scripting language has no control over your cookies
        
        // Path: "/", if / the cookies will be sent for all paths
        // Secure: true, cookie has to be sent over HTTPS
        // MaxAge:   3600 * 24, Time to live of the cookie
        // Domain: The domain for which the cookie is set and can be sent to
        // SameSite: Lax(default, not sent in case of different domains for backend and frontened), Strict, None(can be sent but must be used with secure) or not set. Instructs browser whether or not to sent cookie in case of cross-site requests
        
    }
    res.status(statusCode).cookie("token", authToken, options).json({success: true,user, authToken});
};

module.exports = token;