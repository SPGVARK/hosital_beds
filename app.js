    const express = require('express');
    const port = process.env.PORT||5000;
    const app = express();
    const test2 = require('./BedDataCollector')
    app.use('/api/*',(req,res,next)=>{
        console.log("tested");
        next();
    })
    app.get('/',(req,res)=>{
        res.send("Hello World");
    })
    app.get('/api/beds',(req,res)=>
    {
        res.json(require('./data.json'));
    })
    app.listen(port,()=>{console.log(`Server Running at ${port}`)});
