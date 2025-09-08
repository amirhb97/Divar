const autoBind = require('auto-bind');
const authService = require('./auth.service');
const AuthMessages = require('./auth.message');
const CookieNames = require('../../common/constant/cookie.enum');
const NodeEnv = require('../../common/constant/env.enum');

class AuthController {
    
    #serivce;
    constructor() {
        autoBind(this);
        this.#serivce = authService
    }

    async sendOTP(req,res,next){
        try {
            
            const {mobile} = req.body;
            const result = await this.#serivce.sendOTP(mobile);
            res.json({
                messages : AuthMessages.SendOTPSuccessfuly
            });

        } catch (error) {
            next(error);
        }
    }

    async checkOTP(req,res,next){
        try {
            const {mobile,code} = req.body;
            const accessToken = await this.#serivce.checkOTP(mobile,code);
            res.cookie(CookieNames.AccessToken,accessToken,{
                httpOnly : true,
                secure: process.env.NODE_ENV === NodeEnv.Production
            });
            res.json({
                message : AuthMessages.LoginSuccessfuly
            });
            
        } catch (error) {
            next(error);
        }
    }

    async logout(req,res,next){
        try {
            return res.clearCookie(CookieNames.AccessToken)
                      .json({
                        messages : AuthMessages.LogoutSuccessfuly
                      });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new AuthController();