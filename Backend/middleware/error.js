const Errorhandler = require("../utils/errorhandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  // message = err.stack || "Internal server error";--> will give you error along with location
  err.message = err.message || "Internal server error";

  // Handling mongodb id cast error in case some random no is provided in place of id
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new Errorhandler(message, 400);
    // message = err.message;
    // statusCode = err.statusCode;
  }

  // mongoose duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)[0]} entered`;
    err = new Errorhandler(message, 400);
  }

  //Json web token error
  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is invalid, try again`;
    err = new Errorhandler(message, 400);
  }

  //JET expire error
  if (err.name === "TokenExpireError") {
    const message = `Json Web Token is expired, try again`;
    err = new Errorhandler(message, 400);
  }

  res.status(err.statusCode).json({ success: false, message: err.message });
};
