import Joi from "joi";

const jobSchema = Joi.object({
  jobTitle: Joi.string().required(),

  jobLocation: Joi.string().required(),
  workingTime: Joi.string().required(),
  seniorityLevel: Joi.string()
    .valid("junior", "mid-level", "senior", "team-lead", "CTO")
    .required(),
  jobDescription: Joi.string().required(),
  technicalSkills: Joi.array().items(Joi.string()),
  softSkills: Joi.array().items(Joi.string()),
  addedBy: Joi.string().length(24).required(),
});


export default jobSchema