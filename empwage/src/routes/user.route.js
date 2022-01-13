import express from 'express';
import * as userController from '../controllers/user.controller';
import * as validate from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();


router.post('/register',validate.registerValidator,userController.registerUser);

router.post('/login', validate.loginValidator,userController.loginUser);

export default router;
