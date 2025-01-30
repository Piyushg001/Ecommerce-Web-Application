const express = require('express')
const productcatgRoute = express.Router()
let ProductCatg = require('./productcatg.model')

//Save Product category
productcatgRoute.route('/productcatgsave/:pcatgid/:pcatgname').post((req,res)=>{
    var pc = { pcatgid:req.params.pcatgid,
    pcatgname:req.params.pcatgname}
    let productcatg = new ProductCatg(pc)
    productcatg.save().then(productcatg=>{
        res.status(200).send("saved successfully")
    }).catch(err=>{
        res.status(400).send("unable to save to database")
    })
})

//Product Category Search
productcatgRoute.route('/productcatgsearch/:pcatgid').get((req,res)=>{
    var pcatgid = req.params.pcatgid
    ProductCatg.findOne({"pcatgid":pcatgid}).then(productcatg=>{
        res.send(productcatg)
        res.end()
    }).catch(err=>{
        res.status(400).send('data not found something went wrong')
    })
})

//Update Product Category
productcatgRoute.route('/productcatgupdate/:pcatgid/:pcatgname').put((req,res)=>{
    var pcatgid = req.params.pcatgid
    var pcatgname = req.params.pcatgname
    ProductCatg.updateOne({'pcatgid':pcatgid},{'pcatgid':pcatgid,'pcatgname':pcatgname}).then(productcatg=>{
        res.status(200).json({'productcatg':'ProductCatg updated successfully'})
    }).catch((err)=>{
        res.send(err)
        res.end()
    })
})

//delete Product Category
productcatgRoute.route('/productcatgdelete/:pcatgid').delete((req,res)=>{
    var pcatgid = req.params.pcatgid
    ProductCatg.deleteOne({'pcatgid':pcatgid}).then(productcatg=>{
        if(productcatg.deletedCount>0)
        {
            
            res.send('data deleted')
            res.end()
        }
        else{
            res.send('data not deleted')
            res.end()
        }
    }).catch(err=>{
        res.status(400).send('data not found something went wrong')
    })
})

//show all data
productcatgRoute.route('/productcatgshow').get((req,res)=>{
    ProductCatg.find().then(productcatg=>{
        res.send(productcatg)
        res.end()
    }).catch(err=>{
        res.status(400).send('data not found something went wrong')
    })
})

// get ID of last Entered product to generate ID for next product
productcatgRoute.route('/getproductcatgid').get((req,res)=>{
    ProductCatg.find().sort({'pcatgid':-1}).limit(1).then(productcatg=>{
        console.log(productcatg)
        res.send(productcatg)
        res.end()
    }).catch(err=>{
        res.status(400).send('data not found something went wrong')
    })
})

module.exports = productcatgRoute