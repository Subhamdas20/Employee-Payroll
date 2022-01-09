import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';

/**
 * Controller to get all users available
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const registerUser = async (req, res, next) => {
  try {

    const data = await UserService.registerUser(req.body, res);
    if (data) {
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: ' User registered successfully'
      });
    }
    else {
      res.status(HttpStatus.FORBIDDEN).json({
        code: HttpStatus.FORBIDDEN,
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
      res.status(HttpStatus.FORBIDDEN).json({
        code: HttpStatus.FORBIDDEN,
        data: "",
        message: ' Invalid Credentials'
      });
    }
  } catch (error) {
    next(error);
  }

};
