import { Router } from "express";
import jobControllers from "./job.controllers.js";
import verifyUser from "../../middleware/verifyUser.js";
import { authorization } from "../../middleware/authorization.js";


const jobRouter = Router()


jobRouter.post('/addJob' ,verifyUser,authorization, jobControllers.addJob)


export default jobRouter