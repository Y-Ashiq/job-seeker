import { Router } from "express";
import jobControllers from "./job.controllers.js";
import verifyUser from "../../middleware/verifyUser.js";
import { authorization } from "../../middleware/authorization.js";
import { validation } from "../../middleware/validation.js";
import jobSchema from "./job.validation.js";
import { fileUpload } from "../../utility/fileUpload.js";

const jobRouter = Router();

jobRouter.post( "/addJob",validation(jobSchema), verifyUser,authorization,jobControllers.addJob);
jobRouter.put( "/updateJob/:id",validation(jobSchema), verifyUser,authorization,jobControllers.updateJob);
jobRouter.delete( "/deleteJob/:id", verifyUser,authorization,jobControllers.deleteJob);
jobRouter.get( "/getAllJob", verifyUser,jobControllers.getAllJob);
jobRouter.get( "/filterJob", verifyUser,jobControllers.filterJob);

jobRouter.post( "/applyJob", fileUpload('resume'),verifyUser,authorization,jobControllers.applyJob);

export default jobRouter;
