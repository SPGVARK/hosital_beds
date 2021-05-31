const axios  = require('axios');
const fs = require('fs');
var final = [];
function GetData()
{
    final =[];
    axios.get('https://covidtnadu.com/data/covidtnadu.com/bed_data.json')
    .then((data)=>{
        const Data = (data.data)
        Data.forEach(element => {
            var hospital = 
            {
                city:element.district,
                hospital:element.hospital_name,
                oxy_beds:{
                    total:element.total_beds_with_oxygen,
                    vaccant:element.available_beds_with_oxygen
                },
                non_oxy_beds:{
                    total:element.total_beds_without_oxygen,
                    vaccant:element.available_beds_without_oxygen
                },
                icu_ventilator_beds:{
                    total:element.total_icu_beds_with_ventilator,
                    vaccant:element.available_icu_beds_with_ventilator
                },
                icu_non_ventilator_beds:
                {
                    total:element.total_icu_beds_without_ventilator,
                    vaccant:element.available_icu_beds_without_ventilator
                },
                contact:(element.hospital_poc_phone)?element.hospital_poc_phone:'',
                category:(element.hospital_category)?element.hospital_category:'',
                address:element.hospital_address
            }
            final.push(hospital)
        });
            const json =  JSON.stringify(final,null,2);
            fs.unlink('data.json',()=>
            {
                fs.writeFile('data.json',json,{encoding:'utf8',flag:'w'},()=>{console.log("done")})
            })
        
    })
}
GetData();
setInterval(GetData,2*3600*1000);