import Joi from "joi";
const update_Account_ValidationSchema = Joi.object({
	firstName: Joi.string().min(3).max(30).trim(),
	lastName: Joi.string().min(3).max(30).trim(),
	email: Joi.string().email().trim(),
	password: Joi.string().pattern(
		/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
	),
	recoveryEmail: Joi.string().email().trim(),
	DOB: Joi.date(),
	mobileNumber: Joi.string(),
});
const update_password_ValidationSchema = Joi.object({
	oldPassword: Joi.string()
		.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
		.required(),
	newPassword: Joi.string()
		.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
		.required(),
});
const paramsIdVal = Joi.object({
	id: Joi.string().hex().length(24).required(),
});
const emailValidationSchema = Joi.object({
	email: Joi.string().email().required(),
});
const resetPasswordValidationSchema = Joi.object({
	newPassword: Joi.string()
		.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
		.required(),
	resetPasswordNumber: Joi.number().required(),
});
export {
	update_Account_ValidationSchema,
	paramsIdVal,
	update_password_ValidationSchema,
	emailValidationSchema,
	resetPasswordValidationSchema,
};
