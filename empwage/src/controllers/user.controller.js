import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';

/**
 * Controller to registerUser
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const registerUser = async (req, res, next) => {
  try {
    const data = await UserService.registerUser(req.body, res);
    if (data) {
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: data,
        message: ' User registered successfully'
      });
    }
    else {
      res.status(HttpStatus.CONFLICT).json({
        code: HttpStatus.CONFLICT,
        data: "",
        message: ' Email already registered '
      });
    }
  } catch (error) {
    next(error);
  }

};

/**
 * Controller for login
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const loginUser = async (req, res, next) => {
  try {

    const data = await UserService.loginUser(req.body, res);
    if (data.success == true) {
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: ' User Login successfully'
      });
    }
    else {
      res.status(data.status).json({
        code: data.status,
        data: "",
        message: data.message
      });
    }
  } catch (error) {
    next(error);
  }

};
