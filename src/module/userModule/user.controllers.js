import userModel from "../../database/models/user.model.js";
import { handleError } from "../../middleware/handleError.js";
import { AppError } from "../../utility/appError.js";

import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendEmail from "../../utility/sendEmail.js";

import "dotenv/config";

//*************************************************************************** */
/*                               sign up 

this function api to handle  the registration of the user
and take the first and last namer concatenate it for useName key in the database

//*************************************************************************** */

const signUp = handleError(async (req, res) => {
  let { firstName, lastName } = req.body;
  let userName = firstName + " " + lastName;
  req.body.userName = userName;

  let user = await userModel.create(req.body);

  res.json({ message: "user added successfully", user });
});

//*************************************************************************** */
/*                               sign In  
function to handle user log in
                                   
//*************************************************************************** */

const signIn = handleError(async (req, res, next) => {
  let { data, password } = req.body;

  let isExist = await userModel.find({
    $or: [{ email: data }, { recoveryEmail: data }, { mobileNumber: data }],
  });

  if (isExist.length > 0 && bcrypt.compareSync(password, isExist[0].password)) {
    let token = jwt.sign(
      { id: isExist[0]._id, role: isExist[0].role },
      process.env.SECRET_TOKEN
    );
    await userModel.findByIdAndUpdate(isExist[0]._id, { status: "online" });
    res.status(200).json({ message: "welcome", token });
  } else {
    next(new AppError("incorrect  credentials or password", 400));
  }
});

//*************************************************************************** */
/*                                 update user 
in the update user function it check if the req.body has email or mobilenumber existence
to not make a conflict with other user

//*************************************************************************** */

const updateUser = handleError(async (req, res, next) => {
  delete req.body.password;

  if (req.body.email) {
    let email = await userModel.findOne({ email: req.body.email });

    if (email) {
      return next(new AppError("this email is already exist", 400));
    }
  }
  if (req.body.mobileNumber) {
    let mobileNumber = await userModel.findOne({
      mobileNumber: req.body.mobileNumber,
    });

    if (mobileNumber) {
      return next(new AppError("this mobileNumber is already exist", 400));
    }
  }

  const isValidObjectId = mongoose.Types.ObjectId.isValid(req.params.id);

  if (isValidObjectId) {
    let update = await userModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json({ message: "user updated successfully", update });
  } else {
    next(new AppError("user not found", 404));
  }
});

//***************************************************************************
/*                                 delete user
function to handle user delete
//*************************************************************************** */

const deleteUser = handleError(async (req, res, next) => {
  let user = await userModel.findByIdAndDelete(req.params.id);

  res.status(200).json({ message: "user deleted successfully", user });
});

//***************************************************************************
/*                                 get user 
only the owner of the account can get his account data by req.user.id that came from 
userVerify 
//*************************************************************************** */

const getUser = handleError(async (req, res, next) => {
  let user = await userModel.find(req.user.id).select("-password");

  res.json({ message: " user data", user });
});

//***************************************************************************
/*                           update user password 

the user send the old password and new password to update it in DB 
and check of the old password encryption to compare 
//*************************************************************************** */
const updatePassword = handleError(async (req, res, next) => {
  if (req.body.password) {
    let { oldPassword, newPassword } = req.body;

    let isExist = await userModel.findById(req.user.id);

    if (isExist && bcrypt.compareSync(oldPassword, isExist.password)) {
      let update = await userModel.findByIdAndUpdate(req.user.id, newPassword);

      res
        .status(200)
        .json({ message: "password updated successfully", update });
    } else {
      next(new AppError("incorrect password", 402));
    }
  }
});

//*************************************************************************** */
/*                                 reset password        
send to the user email the OTP   and change the otpCode in the DB to null after user
successfully enter the OTP      in the verifyOTP function down               
//*************************************************************************** */

const sendOTP = handleError(async (req, res, next) => {
  let { email } = req.body;

  let otpCode = Math.floor(100000 + Math.random() * 900000);
  let isExist = await userModel
    .findOneAndUpdate({ email }, { otpCode }, { new: true })
    .select("-password -otpCode");

  if (isExist) {
    let token = jwt.sign({ email: isExist.email }, "token");
    sendEmail(isExist.email, otpCode);
    res.status(200).json({ message: "OTP sent to your email", token });
  } else {
    next(new AppError("user not found", 404));
  }
});

//*************************************************************************** */
/*                redirect the user to verify the OTP        
//*************************************************************************** */

const verifyOTP = handleError((req, res, next) => {
  let { token } = req.headers;

  jwt.verify(token, "token", async (error, decode) => {
    if (error) {
      next(new AppError("invalid user", 402));
    } else {
      let { otp, newPassword } = req.body;
      let { email } = decode;

      let otpCode = userModel.findOne({ otp });

      if (otpCode) {
        newPassword = bcrypt.hashSync(newPassword, 6);
        await userModel.findOneAndUpdate(
          { email },
          { $set: { password: newPassword, otpCode: null } }
        );

        res.status(200).json({ message: "password updated" });
      } else {
        next(new AppError("invalid otp", 402));
      }
    }
  });
});

export default {
  signUp,
  signIn,
  updateUser,
  deleteUser,
  getUser,
  updatePassword,
  sendOTP,
  verifyOTP,
};
