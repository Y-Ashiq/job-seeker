import Joi from "joi";

const signUpSchema = Joi.object({
  firstName: Joi.string().min(3).required(),
  lastName: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  recoveryEmail: Joi.string().email(),
  DOB: Joi.date(),
  mobileNumber: Joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .message("Invalid phone number format")
    .required(),
  role:Joi.string()
});
const signInSchema = Joi.object({
  data: Joi.alternatives()
    .try(
      Joi.string().email(),
      Joi.string()
        .pattern(/^[0-9]{10,15}$/)
        .message("Invalid phone number format")
        .required()
    )
    .required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
});

export { signUpSchema, signInSchema };
