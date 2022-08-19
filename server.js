const express = require('express');
const app = express();

app.set("view engine","ejs");

app.get("/",(req,res)=>{
    res.send("<h1>Please go to this url localhost:3000/museum</h1>");
})

const museumController = require('./Controllers/museumController');
app.use('/museum',museumController);
app.listen(3000,()=>{
    console.log("Server is running at port 3000");
})
