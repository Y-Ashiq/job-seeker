import { Router } from "express";

import userControllers from "./user.controllers.js";
import checkUser from "../../middleware/checkUser.js";

const userRouter = Router();

userRouter.post("/signup",checkUser,userControllers.signUp);
userRouter.post("/signin", userControllers.signIn)



export default userRouter;