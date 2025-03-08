import Joi from "joi";
const SignupValSchema = Joi.object({
	firstName: Joi.string().min(3).max(30).required(),
	lastName: Joi.string().min(3).max(30).required(),
	email: Joi.string().email().required(),
	password: Joi.string()
		.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
		.required(),
	recoveryEmail: Joi.string().email().required(),
	DOB: Joi.date().required(),
	mobileNumber: Joi.string().required(),
});
const LoginSchemaVal = Joi.object({
	email: Joi.string().email(),
	password: Joi.string()
		.pattern(/^[A-Z][a-z0-9$@]{8,30}$/)
		.required(),
	mobileNumber: Joi.string(),
});
export { SignupValSchema, LoginSchemaVal };
