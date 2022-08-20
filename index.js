const express = require('express');
const app = express();
const axios = require('axios').default;
const services=require('./services/app.service')

app.set("view engine","ejs");

app.listen(3000,()=>{
    console.log("Server is running at port 3000");
})

// Root for rendering homepage 
app.get("/",(req,res)=>{
    res.render("homepage")
})
// url for return data for the date in milliseconds
app.get('/visitors',(req,res)=>{
    const timestamp = req.query.month;
    let getMonthYear = services.changeDate(timestamp); /* Converting the millisecond to searchable format string */
    const url = "https://data.lacity.org/resource/trxm-jn3c.json?month="+getMonthYear;
    let data = {};
    // used axios for calling the api
    axios.get(url).then((response)=>{
        data = response.data;
        if(data.length>0){
            // console.log(data)
            // console.log(getMonthYear)
              let result = services.getFinalData(getMonthYear,data[0]);
              console.log(result);
              res.send(result)
        }
        else{
            res.send("<h2>INVALID DATE</h2>")
        }
    }).catch((err)=>{
        res.send(err);
    })
})
module.exports = app;