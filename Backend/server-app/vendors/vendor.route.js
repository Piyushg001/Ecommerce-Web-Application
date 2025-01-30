const express = require('express')
const vendorRoute = express.Router()
let Vendor = require('./vendor.model')
const fs = require('fs')
const multer = require("multer")

// Vendor Registration Code
vendorRoute.route("/register").post((req,res)=>{
    let vendor = new Vendor(req.body)
    console.log(vendor)
    vendor.save().then(vendor=>{
        if(vendor!=null)
        {
            res.send("Registration Successfull")
        }
        else{
            res.send("Registration Failure")
        }
    }).catch(err=>{
        res.status(400).send("Registration Failed")
    })
})

// login
vendorRoute.route("/login/:vuid/:vupass").get((req,res)=>{
    var id = req.params.vuid
    var pass = req.params.vupass
    Vendor.findOne({$and:[{"VUserId":id},{"VUserPass":pass}]}).then(vendor=>{
        console.log(vendor)
        res.send(vendor)
        res.end()
    }).catch(err=>{
        res.status(400).send("data not found something went wrong")
    })
})


// get vendor image
vendorRoute.route("/getimage/:vpicname").get((req, res)=>{
    res.sendFile("C:/Users/piyus/OneDrive/Desktop/Universal Informatics/MERN/React Js/Project/Backend/server-app/vendors/vendorimages/"+req.params.vpicname)
})

// save vendor image
const st = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, 'vendors/vendorimages/')
    },
    filename: (req, file, cb) =>{
        cb(null, file.originalname)
    },
})

const upload = multer({ storage: st})
vendorRoute.route('/savevendorimage').post(upload.single('file'), (req,res)=>{
    res.send("image uploaded")
    res.end()
})


// get vendor for count
vendorRoute.route("/getvendorcount").get((req,res)=>{
    Vendor.find().then(vendor=>{
        console.log(vendor)
        res.send(vendor)
        res.end()
    }).catch(err=>{
        res.status(400).send("data not found something went wrong")
    })
})

module.exports = vendorRoute