    const express = require('express');
    const app = express();
    const test2 = require('./BedDataCollector')
    app.use('/api/*',(req,res,next)=>{
        console.log("tested");
        next();
    })
    app.get('/api/beds',(req,res)=>
    {
        res.json(require('./data.json'));
    })
    app.listen(process.env.PORT||5000);