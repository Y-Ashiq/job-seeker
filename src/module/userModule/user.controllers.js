import userModel from "../../database/models/user.model.js";
import { handleError } from "../../middleware/handleError.js";
import { AppError } from "../../utility/appError.js";

import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const signUp = handleError(async (req, res) => {
  let { firstName, lastName } = req.body;
  let userName = firstName + " " + lastName;
  req.body.userName = userName;

  let user = await userModel.create(req.body);

  res.json({ message: "user added successfully", user });
});

const signIn = handleError(async (req, res, next) => {
  let { data, password } = req.body;

  let isExist = await userModel.find({
    $or: [{ email: data }, { recoveryEmail: data }, { mobileNumber: data }],
  });

  if (isExist.length > 0 && bcrypt.compareSync(password, isExist[0].password)) {
    let token = jwt.sign({id: isExist._id},"token")
    res.status(200).json({ message: "welcome" ,token});
  } else {
    next(new AppError("incorrect email or password", 400));
  }
});

const updateUser = handleError(async (req, res, next) => {
  if (req.body.email) {
    let email = await userModel.findOne({ email: req.body.email });

    if (email) {
      return next(new AppError("this email is already exist", 400));
    }
  }
  if (req.body.mobileNumber) {
    let mobileNumber = await userModel.findOne({
      email: req.body.mobileNumber,
    });

    if (mobileNumber) {
      return next(new AppError("this mobileNumber is already exist", 400));
    }
  }
  if (req.body.recoveryEmail) {
    let recoveryEmail = await userModel.findOne({
      email: req.body.recoveryEmail,
    });

    if (recoveryEmail) {
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

export default { signUp, signIn, updateUser };
