import { Router } from "express";

import userControllers from "./user.controllers.js";
import checkUser from "../../middleware/checkUser.js";
import verifyUser from "../../middleware/verifyUser.js";

const userRouter = Router();

userRouter.post("/signup", checkUser, userControllers.signUp);
userRouter.post("/signin", userControllers.signIn);
userRouter.patch("/updateuser/:id",verifyUser, userControllers.updateUser);
userRouter.patch("/updatepassword",verifyUser, userControllers.updatePassword);
userRouter.delete("/deleteuser/:id",verifyUser, userControllers.deleteUser);
userRouter.get("/getuser",verifyUser, userControllers.getUser);
userRouter.post("/resetpassword/sendOTP", userControllers.sendOTP);
userRouter.post("/resetpassword", userControllers.verifyOTP);

export default userRouter;
