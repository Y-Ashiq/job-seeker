import jwt from "jsonwebtoken";
import { AppError } from "../utility/appError.js";
import companyModel from "../database/models/company.model.js";

export const authorization = (req, res, next) => {
  let { token } = req.headers;

  jwt.verify(token,process.env.SECRET_TOKEN, async (error, decoded) => {
    if (!error) {
      
      if (decoded.role === "HR") {
        if (req.params.id) {
          let companyOwner = await companyModel.find({
            companyHR: decoded.id,
          });
          
          req.company =companyOwner;
          if (companyOwner[0] === undefined) {
            next(new AppError("no data", 404));
          } else {
            next();
          }
        } else {
          next();
        }
      } else {
        next(new AppError("you are not authorized for this", 404));
      }
    } else {
      next(new AppError("invalid token", 404));
    }
  });
};
