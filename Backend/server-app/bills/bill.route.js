const express = require('express')
const billRoute = express.Router()
let Bill = require('./bill.model')

//save bill
billRoute.route('/billsave').post((req,res)=>{
    let bill = new Bill(req.body)
    console.log(bill)
    bill.save().then(bill =>{
        res.status(200).json({"bill":"bill added successfully"})
    }).catch(err=>{
        res.status(400).send("unable to save to database")
    })
})

// show all bicustomer bill by customer id
billRoute.route('/billshow/:cid').get((req,res)=>{
    Bill.find({"cid":req.params.cid}).then(bill =>{
        res.send(bill)
        res.end()
    }).catch(err=>{
        res.status(400).send("Data not found something went wrong")
    })
})

//get id of last entered bill to generate ID for next bill
billRoute.route('/getbillid').get((req,res)=>{
    Bill.find().sort({"billid":-1}).limit(1).then(bill=>{
        console.log(bill)
        res.send(bill)
        res.end()
    }).catch(err =>{
        res.status(400).send("Data not found something went wrong")
    })
})
module.exports = billRoute