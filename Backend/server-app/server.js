const express = require('express')
const app=express()
const cors = require('cors')
const bodyParser = require('body-parser')
const PORT = 9090
const mongoose = require('mongoose')
const config = require('./DB')
const stateRoute = require('./statecity/state.route')
const cityRoute = require('./statecity/city.route')
const productcatgRoute = require('./products/productcatg.route')
const productRoute = require('./products/product.route')
const customerRoute = require('./customers/customer.route')
const paymentRoute = require("./payment")
const vendorRoute = require('./vendors/vendor.route')
const billRoute = require('./bills/bill.route')
//skip line

mongoose.connect(config.URL,{useNewUrlParser:true}).then(()=>{
    console.log('database is connected '+config.URL)
},
err=>{
    console.log('cannot connect to database '+err)
})
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use('/state',stateRoute)
app.use('/city',cityRoute)
app.use('/productcatg',productcatgRoute)
app.use('/product',productRoute)
app.use('/customer',customerRoute)
app.use("/payment",paymentRoute)
app.use("/vendor",vendorRoute)
app.use('/bill',billRoute)

app.listen(PORT,()=>{
    console.log('server is running on PORT '+PORT)
})