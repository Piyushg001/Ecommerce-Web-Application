const express = require('express')
const productRoute = express.Router()
let Product = require('./product.model')
const multer = require("multer")

// Save Product
productRoute.route("/productsave").post((req,res)=>{
    let product = new Product(req.body)
    console.log(product)
    product.save().then(product=>{
        res.status(200).json({'product':'product added successfully'+product})
    }).catch(err=>{
        res.status(400).send("unable to save to database")
    })
})

// get all product
productRoute.route("/productshow").get((req,res)=>{
    Product.find().then(product=>{
        console.log(product)
        res.send(product)
        res.end()
    }).catch(err=>{
        res.status(400).send("data not found something went wrong")
    })
})

// get all product by vendor id
productRoute.route("/productshow/:vid").get((req,res)=>{
    Product.find({"VId":req.params.vid}).then(product=>{
        console.log(product)
        res.send(product)
        res.end()
    }).catch(err=>{
        res.status(400).send("data not found something went wrong")
    })
})

// get last entered product id for entering new id
productRoute.route("/getproductid").get((req,res)=>{
    Product.find().sort({"pid":-1}).limit(1).then(product=>{
        console.log(product)
        res.send(product)
        res.end()
    }).catch(err=>{
        res.status(400).send("data not found something went wrong")
    })
})

// save product image
const st = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, 'products/productimages/')
    },
    filename: (req, file, cb) =>{
        cb(null, file.originalname)
    },
})

const upload = multer({ storage: st})
productRoute.route('/productimagesave').post(upload.single('file'), (req,res)=>{
    res.send("image uploaded")
    res.end()
})

// get product image
productRoute.route("/getproductimage/:picname").get((req, res)=>{
    res.sendFile("C:/Users/piyus/OneDrive/Desktop/Universal Informatics/MERN/React Js/Project/Backend/server-app/products/productimages/"+req.params.picname)
})

module.exports = productRoute