const authRoutes = require('./modules/auth/auth.routes');
const categoryRoutes = require('./modules/category/category.routes');
const optionRoutes = require('./modules/option/option.routes');

const {Router} = require('express');
const router = Router();

router.use('/auth',authRoutes);
router.use('/category',categoryRoutes);
router.use('/option',optionRoutes);


module.exports = router