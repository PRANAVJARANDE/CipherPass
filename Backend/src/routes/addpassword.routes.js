import {Router} from 'express'
import { verifyJWT } from '../middlewares/auth.middleware';
import { addPassword,showPassword,deletePassword,updatePassword,getallPasswords,getPassword } from '../controllers/password.controller';

const router= Router();

//SECURED ROUTES
router.route("/addpassword").post(verifyJWT, addPassword);
router.route("/showpassword/:passwordID").post(verifyJWT, showPassword);
router.route("/deletePassword/:passwordID").delete(verifyJWT, deletePassword);
router.route("/updatePassword/:passwordId").patch(verifyJWT, updatePassword);
router.route("/allpasswords").get(verifyJWT, getallPasswords);
router.route("/getpassword/:passwordID").get(verifyJWT, getPassword);