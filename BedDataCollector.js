const axios  = require('axios');
const cheerio = require('cheerio')
const fs = require('fs');
const interval = 12;
var final_data = [];

async function GetData()
{
    axios.get('https://stopcorona.tn.gov.in/beds.php')
    .then(async data=>{
        const html = data.data;
        const $ = cheerio.load(html)
        var trIndex = 0,tdIndex = 0;
        //console.log(trIndex<500)
        for(trIndex = 1;trIndex<=566;trIndex++)
        {
            var td =  Array.from($(`#dtBasicExample > tbody > tr:nth-child(${trIndex})`).children());
            var td_a = [];
        td.forEach(t=>
            {
                var tex = $(t).text();
                if(tex)
                    td_a.push(tex);
        })
        var hospital = {
            city:td_a[1],
            hospital:td_a[2],
            covid_beds:{
                total:td_a[3],
                occupied:td_a[4],
                vaccant:td_a[5]
            },
            oxy_beds:{
                total:td_a[6],
                occupied:td_a[7],
                vaccant:td_a[8]
            },
            non_oxy_beds:{
                total:td_a[9],
                occupied:td_a[10],
                vaccant:td_a[11]
            },
            icu_beds:{
                total:td_a[12],
                occupied:td_a[13],
                vaccant:td_a[14]
            },
            ventilators:{
                total:td_a[15],
                occupied:td_a[16],
                vaccant:td_a[17]
            },
            contact:[td_a[19]]
        }
        final_data.push(hospital);
        }
        //console.log(final_data)
        const json =  JSON.stringify(final_data);
        fs.writeFile('data.json',json,'utf-8',()=>{console.log("done")})
    })
    
}
GetData();
setInterval(GetData,interval*3600*1000);



