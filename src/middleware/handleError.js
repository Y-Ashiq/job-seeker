import { AppError } from "../utility/appError.js";

export const handleError = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((error) => {
      next(new AppError(error,401))
    });
  };
};
