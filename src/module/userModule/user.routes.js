import { Router } from "express";

import userControllers from "./user.controllers.js";
import checkUser from "../../middleware/checkUser.js";
import verifyUser from "../../middleware/verifyUser.js";

const userRouter = Router();

userRouter.post("/signup", checkUser, userControllers.signUp);
userRouter.post("/signin", userControllers.signIn);
userRouter.patch("/updateuser/:id",verifyUser, userControllers.updateUser);

export default userRouter;
