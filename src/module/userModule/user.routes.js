import { Router } from "express";

import userControllers from "./user.controllers.js";
import checkUser from "../../middleware/checkUser.js";
import verifyUser from "../../middleware/verifyUser.js";
import { validation } from "../../middleware/validation.js";
import {signUpSchema,signInSchema} from "./user.validation.js";

const userRouter = Router();

userRouter.post("/signup",validation(signUpSchema), checkUser, userControllers.signUp);
userRouter.post("/signin", validation(signInSchema),userControllers.signIn);
userRouter.patch("/updateuser/:id",verifyUser, userControllers.updateUser);
userRouter.patch("/updatepassword",verifyUser, userControllers.updatePassword);
userRouter.delete("/deleteuser/:id",verifyUser, userControllers.deleteUser);
userRouter.get("/getuser",verifyUser, userControllers.getUser);
userRouter.post("/resetpassword/sendOTP", userControllers.sendOTP);
userRouter.post("/resetpassword", userControllers.verifyOTP);

export default userRouter;
