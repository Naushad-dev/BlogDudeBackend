const express= require('express');
const{registerController, loginController, updateUser, validateSignIn} = require('../controllers/register.controller.js')
const router= express.Router();

router.post( '/register',registerController)

router.post('/login',loginController)
router.put('/update-user',validateSignIn,updateUser)


module.exports =router;
