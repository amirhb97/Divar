require('dotenv').config();
require('./src/config/mongoose.config');
const express = require('express');


async function app (){
    
    const app =  express();

    
    
    
    
    
    
    app.listen(process.env.PORT,()=>{
        console.log(`service run on port : ${process.env.PORT}`);
    });

}



app();