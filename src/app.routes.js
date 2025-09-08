const authRoutes = require('./modules/auth/auth.routes');

const {Router} = require('express');
const router = Router();

router.use('/auth',authRoutes);


module.exports = router