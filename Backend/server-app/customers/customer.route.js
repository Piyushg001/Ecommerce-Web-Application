const express = require ('express')
const customerRoute = express.Router()
let Customer = require('./customer.model')
const multer = require('multer')

// customer register
customerRoute.route('/customerreg').post((req,res)=>{
    let customer = new Customer(req.body)
    customer.save().then(customer=>{
        res.status(200).json({"customer":"customer added successfully"})
    }).catch(err=>{
        res.status(400).send("unable to save to database")
    })
})

// customer Login
customerRoute.route('/customerlogin').post((req,res)=>{
    var customer = new Customer(req.body)
    Customer.findOne({$and:[{"cuserid":customer.cuserid},{"cuserpass":customer.cuserpass}]}).then(customer=>{
        res.send(customer)
        res.end()
    }).catch(err=>{
        res.status(400).send("data not found something went wrong")
    })
})

//customer details by customer id
customerRoute.route('/customerdetails/:cid').get((req,res)=>{
    Customer.findOne({'cid':req.params.cid}).then(customer=>{
        res.send(customer)
        res.end()
    }).catch(err=>{
        res.status(400).send("data not found something went wrong")
    })
})

//get customer count to set next customer id
customerRoute.route('/getnewcustomerid').get((req,res)=>{
    Customer.find().then(customer=>{
        res.send(customer)
        res.end()
    }).catch(err=>{
        res.status(400).send("something went wrong")
    })
})

//save customer image
const st = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, 'customers/customerimages/')
    },
    filename: (req, file, cb) =>{
        cb(null, file.originalname)
    },
})
const upload = multer({storage: st})
customerRoute.route('/savecustomerimage').post(upload.single('file'), (req,res)=>{
    res.status(200).send("image uploaded")
    res.end()
})

//get customer image
customerRoute.route('/getcustomerimage/:cpicname').get((req,res)=>{
    res.sendFile("C:/Users/piyus/OneDrive/Desktop/Universal Informatics/MERN/React Js/Project/Backend/server-app/customers/customerimages/"+req.params.cpicname)
})

module.exports = customerRoute