import Joi from 'joi';

export const userSchema = Joi.object().keys({
  firstName: Joi.string().alphanum().required(),
  lastName: Joi.string().alphanum().required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .required()
    .min(6)
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
    .strict(),
  confirm_password: Joi.string().valid(Joi.ref('password')).required().strict(),
});

export const resetAuthSchema = Joi.object().keys({
  password: Joi.string()
    .min(8)
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
    .required(),
  confirm_password: Joi.string().valid(Joi.ref('password')).required().strict(),
});
