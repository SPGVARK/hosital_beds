    const express = require('express');
    const cors = require('cors')
    const app = express();
    const port = process.env.PORT||5000;
    const BedCollector = require('./BedCollector')
    app.use(cors())
    app.use('/api/*',(req,res,next)=>{
        console.log("tested");
        next();
    })
    app.get('/api/beds',cors(),(req,res)=>
    {
        res.json(require('./data.json'));
    })
    app.listen(port,()=>{console.log("Server At"+port)});