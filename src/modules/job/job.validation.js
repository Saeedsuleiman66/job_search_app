import Joi from "joi"

const addJobValidationSchema = Joi.object({
    jobTitle: Joi.string().required(),
    jobLocation: Joi.string().required(),
    workingTime: Joi.string().required(),
    seniorityLevel: Joi.string().required(),
    jobDescription: Joi.string().required(),
    technicalSkills: Joi.array().required(),
    softSkills: Joi.array().required(),
    addedBy: Joi.string().hex().length(24).required(),
    company: Joi.string().hex().length(24).required(),
});

const paramsIdVal = Joi.object({
	id: Joi.string().hex().length(24).required(),
});
export { addJobValidationSchema,paramsIdVal }