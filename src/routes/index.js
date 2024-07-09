import express from 'express';

import userRoutes from '../modules/user/user.routes';

/* Creating a new router object. */
const router = express.Router();


/* Telling the router to use the userRoutes object when the url is /user. */
router.use('/user', userRoutes);

export default router;
