let chai = require('chai');

var chaiHttp = require('chai-http');
const e = require('express');
const { response } = require('../server');
chai.use(chaiHttp)
chai.should();
const app = require('../server');

describe("Task Api",()=>{
    it("check / api",(done)=>{
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
           
            res.body.should.be.a('object');
            res.body.should.have.keys('year','month','highest','lowest','total');
            res.body.highest.should.have.keys('museum','visitors');
            done();
           })
    })
    it("IT SHOULD GET month /visitors api ",(done)=>{
        const month = 1 ;
        chai.request(app).get('/visitors?month='+month).end((err,res)=>{
            
            res.should.have.status(200);
            res.text.should.be.eq("<h2>INVALID DATE</h2>");
            
            done();
           })
    })
})
