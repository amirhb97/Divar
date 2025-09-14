const {Schema, model, Types} = require('mongoose');

const optionSchema = new Schema({
    title : {type:String,required:true},
    key : {type:String,required:true},
    type : {type:String, enum:['number','string','boolean'],required:true},
    enum : {type:Array,default:[]},
    gudie : {type:String,required:false},
    category : {type:Types.ObjectId,ref:'Category',required:true},
    required : {type:Boolean,required:false,default:false}
});



const OptionModel = model('Option',optionSchema);
module.exports = OptionModel