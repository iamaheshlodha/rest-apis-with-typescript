import Joi from 'joi'

export const sendValidationSchema = Joi.object({
    user_id: Joi.string().required(),
    message: Joi.string().required(),
    room: Joi.string().required()
})