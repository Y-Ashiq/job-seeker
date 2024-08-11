import jwt from "jsonwebtoken";
import { handleError } from "./handleError.js";
import { AppError } from "../utility/appError.js";
import companyModel from "../database/models/company.model.js";

export const authorization = (req, res, next) => {
  let { token } = req.headers;

  jwt.verify(token, "token", async (error, decoded) => {
    if (!error) {
      if (decoded.role === "HR") {
        console.log(decoded.id);
        let companyOwner = await companyModel.find({
          companyHR: decoded.id,
        });

        if (companyOwner[0] === undefined) {
          next(new AppError("you are not authorized for this", 404));
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
