import Joi from 'joi'

export const userValidationSchema = Joi.object({
    username: Joi.string().min(6).required(),
    password: Joi.string().min(6).required()
})