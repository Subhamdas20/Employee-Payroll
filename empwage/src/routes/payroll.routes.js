import express from 'express';
import * as empController from '../controllers/payroll.controller';
import * as Validator from '../validators/employee.validator';
import { empAuth } from '../middlewares/auth.middleware';

const router = express.Router();    
router.post('/addEmployee', Validator.addEmployeeValidator, empAuth, empController.addEmployee);
router.get('/getEmployee', empAuth, empController.getEmployee);
router.delete('/deleteEmployee', empAuth, empController.deleteEmployee);
router.put('/updateEmployee', empAuth, empController.updateEmployee);

export default router;
