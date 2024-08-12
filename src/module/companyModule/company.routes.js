import { Router } from "express";
import companyControllers from "./company.controllers.js";
import { authorization } from "../../middleware/authorization.js";
import verifyUser from '../../middleware/verifyUser.js'
import { validation } from "../../middleware/validation.js";
import companySchema from "./company.validation.js";


const companyRouter = Router()




companyRouter.post('/addCompany' ,validation(companySchema),verifyUser,authorization, companyControllers.addCompany)
companyRouter.put('/updateCompany/:id' ,verifyUser,authorization, companyControllers.updateCompany)
companyRouter.delete('/deleteCompany/:id' ,verifyUser,authorization, companyControllers.deleteCompany)



export default companyRouter