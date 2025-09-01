const {default : mongoose } = require('mongoose');

mongoose.connect(process.env.MONGODB_URL)
        .then(()=>{
            console.log('connect to mongodb service');
        })
        .catch(err =>{
            console.log("can't connect to mongodb serivce",`errors : ${err?.message ?? "Failed DB connection"}`);
        });

        