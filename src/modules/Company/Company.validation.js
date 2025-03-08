import Joi from "joi";

const addCompanyValidationSchema = Joi.object({
	companyName: Joi.string().required(),
	description: Joi.string().required(),
	industry: Joi.string().required(),
	address: Joi.string().required(),
	numberOfEmployees: Joi.string().required(),
	companyEmail: Joi.string().email().required(),
	companyHR: Joi.string().required().hex().length(24),
});
const updateCompanyValidationSchema=Joi.object({
    companyName: Joi.string(),
    description: Joi.string(),
    industry: Joi.string(),
    address: Joi.string(),
    numberOfEmployees: Joi.string(),
    companyEmail: Joi.string().email(),
    id: Joi.string().hex().length(24).required(),
})
const paramsIdVal = Joi.object({
	id: Joi.string().hex().length(24).required(),
});
export { addCompanyValidationSchema,updateCompanyValidationSchema,paramsIdVal, };
