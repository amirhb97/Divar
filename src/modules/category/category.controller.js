const autoBind = require("auto-bind");
const httpCodes = require('http-codes');
const CategoryService = require('./category.service');
const CategoryMessages = require("./category.message");

class CategoryController{

    #service;
    constructor(){
        autoBind(this);
        this.#service = CategoryService;
    }

    async create(req,res,next){
        try {
            
            const {name,icon,slug,parent} = req.body;
            const category = await this.#service.create({name,icon,slug,parent});

            res.status(httpCodes.CREATED).json({
                messages : CategoryMessages.Created
            });


        } catch (error) {
            next(error);
        }
    }

    async find(req,res,next){
        try {
            
            const allCategory = await this.#service.find();
            res.json({
                allCategory
            });
 
        } catch (error) {
            next(error);
        }
    }

}




module.exports = new CategoryController();