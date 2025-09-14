const optionController = require('./option.controller');

const {Router} = require('express');
const router = Router();

router.post('/',optionController.create);
router.get('/by-category/:categoryId',optionController.findOptionsByCategoryId);
router.get('/by-category/:categorySlug',optionController.findOptionsByCategorySlug);
router.get('/:id',optionController.findById);
router.delete('/:id',optionController.deleteOptionById);
router.put('/:id',optionController.updateById);
router.get('/',optionController.find);


module.exports = router;