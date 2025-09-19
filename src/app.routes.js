const authRoutes = require('./modules/auth/auth.routes');
const categoryRoutes = require('./modules/category/category.routes');
const optionRoutes = require('./modules/option/option.routes');

const {Router} = require('express');
const router = Router();

router.use('/auth',authRoutes);
router.use('/category',categoryRoutes);
router.use('/option',optionRoutes);

// router.use((req,res,next)=>{
//     res.locals.layout = "./layouts/website/main";
//     next();
// });


router.get('/dashboard',(req,res,next)=>{
    res.render('./pages/panel/dashboard');
});


router.get('/auth/login',(req,res,next)=>{
    res.locals.layout = './layouts/auth/main';
    res.render('./pages/auth/login');
});

router.get('/',(req,res,next)=>{
    res.locals.layout = './layouts/website/main';
    res.render('./pages/website/index');
});

module.exports = router