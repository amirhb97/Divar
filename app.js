require('dotenv').config();
require('./src/config/mongoose.config');
const allRoutes = require('./src/app.routes');
const notFoundHandler = require('./src/common/exception/not-found.handler');
const allExceptionHandler = require('./src/common/exception/all-exception.handler');
const cookieParser = require('cookie-parser');
const swaggerConfig = require('./src/config/swagger.config');
const express = require('express');


async function app (){
    
    const app =  express();

    app.use(express.json());
    app.use(express.urlencoded({extended:true}));

    app.use(cookieParser(process.env.COOKIE_SECRET));

    app.use(allRoutes);
    swaggerConfig(app);
    notFoundHandler(app);
    allExceptionHandler(app);
    
    app.listen(process.env.PORT,()=>{
        console.log(`service run on port : ${process.env.PORT}`);
    });

}



app();