import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';

/**
 * Controller to  register user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const registerUser = async (req, res, next) => {
  try {

    const data = await UserService.registerUser(req.body, res);
    console.log(data);
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
 * Controller to  register user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
 export const LoginUser = async (req, res, next) => {
  try {

    const data = await UserService.loginUser(req.body, res);
    console.log(data);
    if (data) {
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: ' Login successfully'
      });
    }
    else {
      res.status(HttpStatus.UNAUTHORIZED).json({
        code: HttpStatus.UNAUTHORIZED,
        data: "",
        message: 'Login Failed '
      });
    }
  } catch (error) {
    next(error);
  }

};

