import userModel from "../database/models/user.model.js";
import bcrypt from "bcrypt";
import { handleError } from "./handleError.js";
import { AppError } from "../utility/appError.js";

const checkUser = handleError(async (req, res, next) => {
  let { email } = req.body;

  let user = await userModel.findOne({ email });

  if (user) {
    next(new AppError("this email is already exist", 400));
  } else {
    req.body.password = bcrypt.hashSync(req.body.password, 5);
    next();
  }
});

export default checkUser;
