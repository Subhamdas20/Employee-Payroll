import express from 'express';
import * as empController from '../controllers/payroll.controller';
import { newUserValidator } from '../validators/user.validator';
import  {empAuth}  from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/addEmployee',empAuth, empController.addEmployee);
router.get('/getEmployee',empAuth, empController.getEmployee);
router.delete('/deleteEmployee',empAuth, empController.deleteEmployee);
router.delete('/updateEmployee',empAuth, empController.updateEmployee);

export default router;
