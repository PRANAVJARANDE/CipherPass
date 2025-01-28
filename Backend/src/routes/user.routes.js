import {Router} from 'express'
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { getCurrentUser, loginUser, logoutUser,forgotPassword,resetPassword, refreshAccessToken, registerUser } from '../controllers/user.controller.js';

const router= Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

//SECURED ROUTES
router.route('/logout').post(verifyJWT,logoutUser);
router.route('/refresh-token').post(refreshAccessToken);
router.route('/getcurrentuser').get(verifyJWT,getCurrentUser);
router.route('/forgotpassword').post(forgotPassword);
router.route('/resetpassword/:token').post(resetPassword);


export default router;