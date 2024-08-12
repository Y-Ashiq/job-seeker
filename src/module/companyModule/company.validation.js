import Joi from "joi";

const companySchema = Joi.object({
  companyName: Joi.string().min(3).required(),

  description: Joi.string().required(),
  industry: Joi.string().required(),
  numberOfEmployees: Joi.allow(),

  companyEmail: Joi.string().email().required(),
  companyHR: Joi.string().length(24).required()
});


export default companySchema