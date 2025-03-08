import Joi from "joi"

const addApplicationValidationSchema = Joi.object({
    jobId: Joi.string().hex().length(24).required(),
    userId: Joi.string().hex().length(24).required(),
    userTechSkills: Joi.array().required(),
    userSoftSkills: Joi.array().required(),
})
const paramsIdVal = Joi.object({
    id: Joi.string().hex().length(24).required(),
})
export { addApplicationValidationSchema, paramsIdVal }