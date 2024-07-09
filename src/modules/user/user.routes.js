import { Router } from 'express';

import { registerUser, loginUser } from './user.controller';


const router = Router();

/* Creating a route for the register endpoint. */
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);



export default router;
