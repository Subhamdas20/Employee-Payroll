import Joi from '@hapi/joi';


export const registerValidator = (req, res, next) => {
  const validateRegister = Joi.object({
    firstname: Joi.string().min(2).required().trim(true),
    lastname: Joi.string().min(2).required().trim(true),
    email: Joi.string().email().required().trim(true),
    password: Joi.string().min(2).max(10).required().trim(true)
  });
  const { error, value } = validateRegister.validate(req.body);
  
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
}

export const loginValidator = (req, res, next) => {
  const validateLogin = Joi.object({
    email: Joi.string().email().required().trim(true),
    password: Joi.string().min(2).max(10).required().trim(true)
  });
  const { error, value } = validateLogin.validate(req.body);
  
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
}