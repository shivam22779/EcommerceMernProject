const Errorhandler = require("../utils/errorhandler");
const ApiFeatures = require("../utils/apifeatures");
const User = require("../models/userModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const token = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

// Register a user
exports.signUp = catchAsyncErrors(async (req, res, next) => {
  let avatar = "";
  if (req.body.avatar) {
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    avatar = {
      publicId: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  // if (userExists) {
  //   return next(
  //     new Errorhandler("Sorry a user with this email already exists", 404)
  //   );
  // }
  // Handled above error in error.js
  const newUser = await User.create({
    name,
    email,
    password,
    avatar,
    // avatar: {
    //   publicId: myCloud.public_id,
    //   url: myCloud.secure_url,
    // },
  });
  token(newUser, res, 201);
});

//Login endpoint
exports.login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new Errorhandler("Kindly provide the credentials", 400));
  }
  const oldUser = await User.findOne({ email }).select("+password");

  if (!oldUser) {
    return next(new Errorhandler("Kindly provide correct credentials", 401));
  }

  const isCorrectPassword = await oldUser.comparePassword(password);
  if (!isCorrectPassword) {
    return next(new Errorhandler("Kindly provide correct credentials", 401));
  }
  token(oldUser, res, 200);
});

//Logout user
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res
    .status(200)
    .json({ success: true, message: "User Logged out successfully" });
});

// Forgot Password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new Errorhandler("User not found", 404));
  }

  // Get reset password token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  
  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${resetToken}`;
  const message = `Your password reset link is below :- \n\n ${resetPasswordUrl} \n\nIf you haven't requested it, please ignore it`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerce password recovery`,
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully.`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });
    return next(new Errorhandler(error.message, 500));
  }
});

//Reset password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  //Create hashed token

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  console.log(user);
  if (!user) {
    return next(
      new Errorhandler(
        "Reset password token is invalid or token is expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new Errorhandler("Password doesn't match", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();
  token(user, res, 200);
});

//Get User details
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  res.status(200).json({ success: true, user });
});

//Update User Password
exports.updateUserPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user._id).select("+password");
  const isCorrectPassword = await user.comparePassword(req.body.oldPassword);
  if (!isCorrectPassword) {
    return next(new Errorhandler("Old password is incorrect", 401));
  }

  if (req.body.oldPassword === req.body.newPassword) {
    return next(
      new Errorhandler("New password must be different from old one", 400)
    );
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new Errorhandler("Password doesn't match", 400));
  }

  user.password = req.body.newPassword;
  await user.save();
  token(user, res, 200);
});

//Update User Profile
exports.updateUserProfile = catchAsyncErrors(async (req, res, next) => {
  let updatedUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  if (req.body.avatar) {
    const user = await User.findById(req.user._id);

    if (user.avatar.publicId) {
      const imageId = user.avatar.publicId;
      await cloudinary.v2.uploader.destroy(imageId);
    }

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    updatedUserData.avatar = {
      publicId: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(req.user._id, updatedUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res
    .status(200)
    .json({ success: true, message: "User updated successfully", user });
});

//Get all users by admin only
exports.getUsersDetails = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find({});
  res.status(200).json({
    success: true,
    users,
  });
});

//Get single user by admin only
exports.getUserDetail = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new Errorhandler(`User doesn't exists with Id: ${req.params.id}`, 400)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});

//Update User role by admin only
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
  const updatedUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };
  let user = User.findById(req.params.id);
  if (!user) {
    return next(
      new Errorhandler(`User doesn't exists with Id: ${req.params.id}`, 400)
    );
  }

  user = await User.findByIdAndUpdate(req.params.id, updatedUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res
    .status(200)
    .json({ success: true, message: "User role updated successfully" });
});

//Delete User role by admin only
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new Errorhandler(`User doesn't exists with Id: ${req.params.id}`, 400)
    );
  }

  const imageId = user.avatar.publicId;
  await cloudinary.v2.uploader.destroy(imageId);

  await user.remove();

  res.status(200).json({ success: true, message: "User deleted successfully" });
});
