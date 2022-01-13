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

/**
 * Controller to get Employees
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
 export const getEmployee = async (req, res, next) => {
    try {
      const data = await EmployeeService.getEmployee(req.body, res);
      if (data.length) {
        res.status(HttpStatus.OK).json({
          code: HttpStatus.OK,
          data: data,
          message: ' Employee records found'
        });
      }
      else  {
        res.status(HttpStatus.NOT_FOUND).json({
          code: HttpStatus.NOT_FOUND,
          data: "",
          message: ' Employee details not found '
        });
      }
    } catch (error) {
      next(error);
    }
  
  };

  
/**
 * Controller to delete Employees
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
 export const deleteEmployee = async (req, res, next) => {
    try {
      const data = await EmployeeService.deleteEmployee(req.body, res);
      if (data.deletedCount) {
        res.status(HttpStatus.OK).json({
          code: HttpStatus.OK,
          data: data,
          message: ' Employee records Deleted'
        });
      }
      else if(!data){
        res.status(HttpStatus.NOT_FOUND).json({
          code: HttpStatus.NOT_FOUND,
          data: "",
          message: ' Employee details not found '
        });
      }
    } catch (error) {
      next(error);
    }
  };

    
/**
 * Controller to update Employees
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
 export const updateEmployee = async (req, res, next) => {
    try {
      const data = await EmployeeService.updateEmployee(req.body, res);
      if (data) {
        res.status(HttpStatus.OK).json({
          code: HttpStatus.OK,
          data: data,
          message: ' Employee records Updated'
        });
      }
      else {
        res.status(HttpStatus.NOT_FOUND).json({
          code: HttpStatus.NOT_FOUND,
          data: "",
          message: ' Employee details not found '
        });
      }
    } catch (error) {
      next(error);
    }
  };