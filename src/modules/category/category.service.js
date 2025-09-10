const createHttpError = require('http-errors');
const { isValidObjectId, Types } = require('mongoose');
const { default: slugify } = require('slugify');
const CategoryModel = require('./category.model');
const CategoryMessages = require('./category.message');

class CategoryService{
    
    #model;
    constructor(){
        this.#model = CategoryModel;
    }

    async create(categoryDTO){

        if(categoryDTO.parent && isValidObjectId(categoryDTO.parent)){
            const existCategory = await this.checkExistById(categoryDTO.parent);

            categoryDTO.parents = [
                ... new Set(
                    ([existCategory._id.toString()].concat(
                        existCategory.parents.map(id => id.toString())
                    )).map(id => new Types.ObjectId(id))
                )
            ];

    

        }

        if(categoryDTO.slug){
            categoryDTO.slug = slugify(categoryDTO.slug);
            await this.alreadyExistBySlug(categoryDTO.slug);
        }else{
            categoryDTO.slug = slugify(categoryDTO.name);
        }

        const category = await this.#model.create(categoryDTO);
        return category;

    }

     async find(){

        const allCategory = await this.#model.find({parents:[]});
        return allCategory;

    }

    async checkExistById(id){
        const category = await this.#model.findById(id);
        if(!category) throw new createHttpError.NotFound(CategoryMessages.NotFound);
        return category;
    }

    async alreadyExistBySlug(slug){
        const category = await this.#model.findOne({slug});
        if(category) throw new createHttpError.Conflict(CategoryMessages.AlreadyExist);
    }

    async checkExistBySlug(slug){
        const category = await this.#model.findOne({slug});
        if(!category) throw new createHttpError.NotFound(CategoryMessages.NotFound);
    }


}

module.exports = new CategoryService();