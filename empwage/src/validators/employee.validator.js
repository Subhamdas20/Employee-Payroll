import Joi from '@hapi/joi';

export const addEmployeeValidator = (req, res, next) => {
  const validateRegister = Joi.object({
    firstname: Joi.string().min(2).required().trim(true),
    lastname: Joi.string().min(2).required().trim(true),
    gender: Joi.string().min(1).required().trim(true),
    department: Joi.string().min(2).max(10).required().trim(true),
    salary : Joi.number().integer().min(1),
    startdate : Joi.date().iso().required(),
    notes : Joi.string().min(2).required().trim(true)
  });
  const { error, value } = validateRegister.validate(req.body);
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
}