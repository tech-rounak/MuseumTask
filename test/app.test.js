let chai = require('chai');

var chaiHttp = require('chai-http');
const e = require('express');
const { response } = require('..');
chai.use(chaiHttp)
chai.should();
const app = require('..');

describe("Task Api",()=>{
    it("check / api",(done)=>{
        // normal checking for the root url for the main homepage;
       chai.request(app).get('/').end((err,res)=>{
        if(err)throw err;
        res.should.have.status(200);
        done();
       })
    })

    it("IT SHOULD GET month /visitors api ",(done)=>{
        const month = 1404198000000;
        chai.request(app).get('/visitors?month='+month).end((err,res)=>{
            
            res.should.have.status(200);
        //    to check for the response data is in object formay
            res.body.should.be.a('object');
        // to check that the obj is of this form
    //    { 
    //    "year":"2014",
    //    "month":"July",
    //    "highest":{
    //     "museum":"avila_adobe",
    //     "visitors":"32378"
    //     },
    //    "lowest":{
    //         "museum":"hellman_quon",
    //         "visitors":"120"},
    //    "total":62549
    //     }
            res.body.should.have.keys('year','month','highest','lowest','total');

            res.body.highest.should.have.keys('museum','visitors');
            res.body.lowest.should.have.keys('museum','visitors');
            res.body.total.should.have.property('total');
            done();
           })
    })
    it("IT SHOULD GET month /visitors api ",(done)=>{
        const month = 1 ;
        chai.request(app).get('/visitors?month='+month).end((err,res)=>{
            // check for response when data is not found;
            res.should.have.status(200);
            res.text.should.be.eq("<h2>INVALID DATE</h2>");
            
            done();
           })
    })
})
