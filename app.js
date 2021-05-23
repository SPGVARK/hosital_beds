    const express = require('express');
    const port = process.env.PORT||5000;
    const app = express();
    const cors = require('cors');
    const test2 = require('./BedDataCollector')
    app.use('/api/*',(req,res,next)=>{
        //console.log("tested");
        next();
    })
    app.get('/',(req,res)=>{
        res.send("SPGVARK Cannot GET /");
    })
    app.get('/api/beds',cors(),(req,res)=>
    {
        res.set('Cache-control', 'public, max-age=2500')
        res.json(require('./data.json'));
    })
    app.listen(port,()=>{console.log(`Server Running at ${port}`)});
