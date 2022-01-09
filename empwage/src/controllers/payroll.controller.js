import HttpStatus from 'http-status-codes';
import * as EmployeeService from '../services/payroll.service';

/**
 * Controller to add Employees
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const addEmployee = async (req, res, next) => {
  try {
    const data = await EmployeeService.addEmployee(req.body, res);
    if (data) {
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: ' Employee added successfully'
      });
    }
  } catch (error) {
    next(error);
  }

};