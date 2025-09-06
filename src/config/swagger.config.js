const path = require('path');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


function swaagerConfig(app){
    
    const swaggerDocument = swaggerJsDoc({
        swaggerDefinition:{
            openapi : '3.0.1',
            info:{
                version:'1.0.0',
                title:'Divar',
                description:'A simple clone from divar site'
            }
        },
        apis : [path.join(process.cwd(),'src','modules','**',"*.swagger.js")]
    });

    const swagger = swaggerUi.setup(swaggerDocument,{});

    app.use('/',swaggerUi.serve,swagger);

}

module.exports = swaagerConfig;




