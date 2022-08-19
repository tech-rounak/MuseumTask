const express = require('express');
const router = express.Router();
const axios = require('axios').default;
const services=require('../services/museumController.service')

router.get('/',(req,res)=>{
    res.render('./homepage');
})
router.get('/visitors',(req,res)=>{
    const timestamp = req.query.month;
    let getMonthYear = services.changeDate(timestamp);
    const url="https://data.lacity.org/resource/trxm-jn3c.json?month="+getMonthYear;
    console.log(url);
    let data = {};
    axios.get(url).then((response)=>{
    
        data = response.data;
        if(data.length>0){
              let result = services.getFinalData(getMonthYear,data[0]);
              console.log(result);
              res.send(result)
        }
        else{
            res.send("<h2>INVALID DATE</h2>")
        }

    }).catch((err)=>{
        res.send(err.message);
    })
})

module.exports = router;