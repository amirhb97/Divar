const {Schema,model} = require('mongoose');

const OTPSchema = new Schema({
    code : {type:String,required:false,default:null},
    expiresIn : {type:Number,required:false,default:0}
});

const userSchema = new Schema({
    fullName : {type:String,required:false},
    mobile : {type:String,required:true,unique:true},
    otp : {type:OTPSchema},
    verifiedMobile : {type:Boolean,required:false,default:false},
    accessToken : {type:String,required:false}
},{
    timestamps : true
});

const UserModel = model('User',userSchema);

module.exports = UserModel

