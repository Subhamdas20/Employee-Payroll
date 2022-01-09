import express from 'express';
import * as empController from '../controllers/payroll.controller';
import { newUserValidator } from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();


router.post('/addEmployee', empController.addEmployee);

router.get('/getEmployee', empController.addEmployee);



export default router;
