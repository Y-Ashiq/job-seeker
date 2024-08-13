import jwt from "jsonwebtoken";
import { AppError } from "../utility/appError.js";

const verifyUser = (req, res, next) => {
  let { token } = req.headers;

  jwt.verify(token, "token", async (error, decoded) => {
    if (error) {
      return next(new AppError("invalid user token", 404));
    } else {

        req.user = decoded
        
      next();
    }
  });
}

export default verifyUser
