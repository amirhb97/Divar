const AuthMessages = Object.freeze({
    SendOTPSuccessfuly : 'sent otp successfuly',
    NotFound : 'user not found',
    OtpCodeNotExpired : 'otp code is not expired please try again later',
    OtpCodeExpired: 'otp code is expired please get new otp code',
    OtpCodeIsIncorrect : 'the otp code is incorrect',
    LoginSuccessfuly: 'login is successful',
    LogoutSuccessfuly: 'logout is successful'
});



module.exports = AuthMessages;