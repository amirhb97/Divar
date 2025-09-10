const {Schema,model,Types} = require('mongoose');

const categorySchema = new Schema({
    name : {type:String,required:true},
    slug : {type:String,required:true,index:true},
    icon: {type:String,required:true},
    parent : {type:Types.ObjectId,ref:'Category',required:false},
    parents : {type:[Types.ObjectId],ref:'Category',required:false,default:[]}
},{
    timestamps:true,
    versionKey:false,
    id:false,
    toJSON:{virtuals:true}
});


categorySchema.virtual('children',{
    ref:'Category',
    localField:'_id',
    foreignField:'parent'
});


function autoPopulate(next){
    this.populate('children');
    next();
}

categorySchema.pre('find',autoPopulate).pre('findOne',autoPopulate);


const CategoryModel = model('Category',categorySchema);

module.exports = CategoryModel;