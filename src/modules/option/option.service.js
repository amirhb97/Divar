const createHttpError = require('http-errors');
const { default: slugify } = require('slugify');
const OptionModel = require('./option.model');
const CategoryModel = require('../category/category.model');
const OptionMessages = require('./option.message');
const { isValidObjectId } = require('mongoose');
const {isFalse,isTrue} = require('../../common/utils/function');

class OptionSerive {
    #model;
    #categoryModel;
    constructor(){
        this.#model = OptionModel;
        this.#categoryModel = CategoryModel;
    }


    async create(optionDTO){

        const category = await this.checkExistByCategoryId(optionDTO.category);
        optionDTO.category = category._id;

        optionDTO.key = slugify(optionDTO.key,{trim:true,replacement:'_',lower:true});
        await this.checkExistKeyInCategory(optionDTO.key,optionDTO.category);
        
        //when a array send from url-encoded(html form)  it convert to string: ['1','2','3']===>"1,2,3"
        if(optionDTO.enum && typeof optionDTO.enum == 'string'){
            optionDTO.enum = optionDTO.enum.split(',');
        }else if(!Array.isArray(optionDTO.enum)) optionDTO.enum = [];

        if(isTrue(optionDTO.required)) optionDTO.required = true;
        if(isFalse(optionDTO.required)) optionDTO.required = false;


        const option = await this.#model.create(optionDTO);
        return option;
    }

    async find(){
        const options = await this.#model.find({},{__v:0},{sort:{_id:-1}}).populate([{path:'category',select:{name:1,slug:1}}]);
        return options;
    }

    async findById(id){
        if(!isValidObjectId(id)) throw new createHttpError.BadRequest(OptionMessages.NotValidObejctId);
        const option = await this.#model.findById(id);
        if(!option) throw new createHttpError.NotFound(OptionMessages.NotFound);
        return option;
    }


    async updateById(id,optionDTO){
        
        if(!isValidObjectId(id)) throw new createHttpError(OptionMessages.NotValidObejctId);
        const existOption = await this.findById(id);

        if(optionDTO.category){
            
            if(!isValidObjectId(optionDTO.category)) throw new createHttpError(OptionMessages.NotValidObejctId);
            const category = await this.checkExistByCategoryId(optionDTO.category);
            
        }

        if(optionDTO.key){

            optionDTO.key = slugify(optionDTO.key,{trim:true,replacement:"_",lower:true});            
            let categoryId = existOption.category;
            if(optionDTO.category) categoryId = optionDTO.category
            await this.checkExistKeyInCategory(optionDTO.key,categoryId);
        }

        if(optionDTO.enum && typeof optionDTO.enum == 'string'){
            optionDTO.enum = optionDTO.enum.split(',');
        }else if(!Array.isArray(optionDTO.enum)) delete optionDTO.enum;

        if(optionDTO.required && isTrue(optionDTO.required)) optionDTO.required = true;
        else{delete optionDTO.required}

        return await this.#model.updateOne({_id:id},{$set : optionDTO });

    }

    async deleteOptionById(id){
        if(!isValidObjectId(id)) throw new createHttpError.BadRequest(OptionMessages.NotValidObejctId);
        await this.findById(id);
        const result = await this.#model.findByIdAndDelete(id);
        return result
    }

    async findOptionsByCategoryId(categoryId){
        if(!isValidObjectId(categoryId)) throw new createHttpError.BadRequest(OptionMessages.NotValidObejctId);
        const options = await this.#model.find({category : categoryId},{__v:0},{sort:{_id : -1}})
                                        .populate({path:'category',select:{name : 1,icon: 1,slug: 1}});
        
        return options;
        
    }

    async findOptionsByCategorySlug(slug){
        //method 1:
        // const category = await this.checkExistByCategorySlug(slug);
        // const options = await this.#model.find({category : category._id},{__v:0});
        // return options;
        
        //method2:
        const options = await this.#model.aggregate([
            {
                //lookup = populate('virtuals');
                $lookup : {
                    from : 'categories',
                    localField : 'category',
                    foreignField: '_id',
                    as : 'category'
                }
            },
            {
                $unwind: '$category' //export categroy from array
            },
            {
                $addFields : {
                    categorySlug : '$category.slug',
                    categoryName: '$category.name',
                    categoryIcon: '$category.icon'
                }
            },
            {
                $project : {
                    category : 0,
                    __v : 0
                }
            },
            {
                $match : {
                    categorySlug : slug
                }
            }
        ]);

        return options;
    }

    async checkExistByCategoryId(id){
        const category = await this.#categoryModel.findById(id);
        if(!category) throw new createHttpError.NotFound(OptionMessages.NotFoundCategory);
        return category;
    }

    async checkExistByCategorySlug(slug){
        const category = await this.#categoryModel.findOne({slug});
        if(!category) throw new createHttpError.NotFound(OptionMessages.NotFoundCategory);
        return category;
    }

    async checkExistKeyInCategory(key,category){
        const existKey = await this.#model.findOne({key,category});
        if(existKey) throw new createHttpError.Conflict(OptionMessages.AlreadyKeyExist);
    }


}



module.exports = new OptionSerive();