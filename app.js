    const express = require('express');
    const cors = require('cors')
    const app = express();
    const fs = require('fs')
    const port = process.env.PORT||5000;
    const BedCollector = require('./BedCollector')
    app.use(cors())
    app.use('/api/*',(req,res,next)=>{
        //console.log("tested");
        next();
    })
    app.get('/api/beds',cors(),(req,res)=>
    {
        fs.readFile('config.json','utf-8',(err,data)=>{
            var j = JSON.parse(data);
            j.views =  j.views+1;
            fs.writeFile('config.json',JSON.stringify(j),()=>{res.json(require('./data.json'));});
        })
        
    })
    app.get('/api/a/v',(req,res)=>{
        const j = JSON.parse(fs.readFileSync('config.json'));
        res.send(`V ${j.views.toString()}`);
    })
    app.listen(port,()=>{console.log("Server At"+port)});