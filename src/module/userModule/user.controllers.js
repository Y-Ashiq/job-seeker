import userModel from "../../database/models/user.model.js";
import { handleError } from "../../middleware/handleError.js";
import bcrypt from "bcrypt";
import { AppError } from "../../utility/appError.js";

const signUp = handleError(async (req, res) => {
  let { firstName, lastName } = req.body;
  let userName = firstName + " " + lastName;
  req.body.userName = userName;

  let user = await userModel.create(req.body);

  res.json({ message: "user added successfully", user });
});

const signIn = handleError(async (req, res, next) => {
  let { email, phoneNumber, recoveryEmail, password } = req.body;

  let isExist = await userModel.find({
    $or: [{ email }, { recoveryEmail }, { phoneNumber }],
  });

  if (isExist && bcrypt.compareSync(password, isExist[0].password)) {
    res.status(200).json({ message: "welcome" });
  } else {
    next(new AppError("incorrect email or password", 400))
  }
});
export default { signUp ,signIn};
