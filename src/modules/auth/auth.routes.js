const authController = require('./auth.controller');
const authorization = require('../../common/guard/authorization.guard');
const {Router} = require('express');

const router = Router();

router.post('/send-otp',authController.sendOTP);
router.post('/check-otp',authController.checkOTP);
router.get('/logout',authorization,authController.logout);


module.exports = router;



