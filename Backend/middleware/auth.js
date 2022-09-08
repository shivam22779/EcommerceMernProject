const Errorhandler = require("../utils/errorhandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require('../models/userModel') 

exports.hasUserLoggedIn = catchAsyncErrors(async(req, res, next)=>{
    const {token}  = req.cookies;
    if(!token){
        return next(new Errorhandler("Please login to access resourse", 401));
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decodedToken.id);
    next();
});

exports.authorizedRoles = (...roles)=>{
    return (req, res, next)=>{
        if(!roles.includes(req.user.role)){
            return next(
            new Errorhandler(
                `Role ${req.user.role} is not allowed to access this resourse`, 403
            ));
        };
        next();
    };
};
    
        