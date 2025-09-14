const autoBind = require("auto-bind");
const httpCodes = require('http-codes')
const createHttpError = require("http-errors");
const optionService = require("./option.service");
const OptionMessages = require('./option.message');


class OptionController {
    
    #service
    constructor(){
        autoBind(this);
        this.#service = optionService
    }

    async create(req,res,next){
        try {
            const {title,key,category,type,guide,enum:list,required} = req.body;
            await this.#service.create({title,key,category,type,guide,enum:list,required});
            res.status(httpCodes.CREATED).json({
                messages : OptionMessages.Created
            });
        } catch (error) {
            next(error);
        }
    }

    async find(req,res,next){
        try {
            const options = await this.#service.find();
            res.json({
                options
            });
        } catch (error) {
            next(error)
        }
    }

    async findById(req,res,next){
        try {
            const {id} = req.params;
            const option = await this.#service.findById(id);
            res.json({
                option
            })
        } catch (error) {
            next(error);
        }
    }

    async updateById(req,res,next){
        try {
            const {id} = req.params;
            const {title,key,category,type,guide,enum:list,required} = req.body
            await this.#service.updateById(id,{title,key,category,type,guide,enum:list,required});
            res.json({
                messages : OptionMessages.UpdateOptionSuccessfuly
            })
        } catch (error) {
            next(error);
        }
    }

    async deleteOptionById(req,res,next){
        try {
            const {id} = req.params
            await this.#service.deleteOptionById(id);
            res.json({
                messages : OptionMessages.DeleteOptionSuccessfuly
            });
        } catch (error) {
            next(error)
        }
    }

    async findOptionsByCategoryId(req,res,next){
        try {
            const {categoryId} = req.params;
            const options = await this.#service.findOptionsByCategoryId(categoryId);
            res.json({
                options
            });

        } catch (error) {
            next(error);
        }
    }

    async findOptionsByCategorySlug(req,res,next){
        try {
            const {categorySlug} = req.params;
            if(categorySlug){
                const options = await this.#service.findOptionsByCategorySlug(categorySlug);
                return res.json({
                    options
                });
            }
            throw new createHttpError.BadRequest(OptionMessages.SlugNotSend);

        } catch (error) {
            next(error);
        }
    }

}


module.exports = new OptionController();