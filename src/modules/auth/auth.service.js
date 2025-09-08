const jwt = require('jsonwebtoken');
const createHttpError = require('http-errors');
const {randomInt} = require('crypto')
const UserModel = require('../users/user.model');
const AuthMessages = require('./auth.message');

class AuthSerivce {

    #model;
    constructor(){
        this.#model = UserModel
    }

    async sendOTP(mobile){

        
        let user = await this.#model.findOne({mobile});
        const now = new Date().getTime();
        const otp = {
            code : randomInt(10000,99999),
            expiresIn : now + 1000*60*2
        }
        if(user){
            //Declare a validaton for OTP spam
            if(user.otp?.expiresIn && user.otp.expiresIn > now){
                throw new createHttpError.BadRequest(AuthMessages.OtpCodeNotExpired);
            }
            user.otp = otp;
        }else{
            user = new this.#model({
                mobile,
                otp
            })
        }

        await user.save();
        return user;
    }

    async checkOTP(mobile,code){
        
        const now = new Date().getTime();
        const user = await this.checkExistByMobile(mobile);
        
        if(user.otp.expiresIn < now) throw new createHttpError.Unauthorized(AuthMessages.OtpCodeExpired);
        if(user.otp.code != code ) throw createHttpError.Unauthorized(AuthMessages.OtpCodeIsIncorrect);
        if(user.verifiedMobile != false ) user.verifiedMobile = true;

        const accessToken = this.signToken({mobile,id:user._id});
        user.accessToken = accessToken;
        await user.save();

        return accessToken;

    }

    async checkExistByMobile(mobile){
        const user = await this.#model.findOne({mobile});
        if(!user) throw new createHttpError.NotFound(AuthMessages.NotFound);
        return user;
    }

    signToken(payload){
        return jwt.sign(payload,process.env.JWT_SECRET,{
            expiresIn: '1y'
        });
    }

}

module.exports = new AuthSerivce();