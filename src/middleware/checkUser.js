import userModel from "../database/models/user.model.js";
import bcrypt from "bcrypt";
import { handleError } from "./handleError.js";
import { AppError } from "../utility/appError.js";

const checkUser = handleError(async (req, res, next) => {

  
  
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
      return next(new AppError("this mobile Number is already exist", 400));
    }
  }
  
    req.body.password = bcrypt.hashSync(req.body.password, 5);
    next();
  
});

export default checkUser;
