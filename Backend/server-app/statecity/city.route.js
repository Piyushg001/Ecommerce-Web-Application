const express = require('express')
const cityRoute = express.Router()
let City = require('./city.model')
let State = require('./state.model')

//Save City
cityRoute.route('/citysave').post((req,res)=>{
    var city = new City(req.body)
    city.save().then(city=>{
        res.send("city saved")
        res.end()
    }).catch((err)=>{
        res.status(400).send("unable to save to database")
    })
})

//search city
cityRoute.route('/citysearch/:ctid').get((req,res)=>{
    var ctid = req.params.ctid
    City.findOne({"ctid":ctid}).then(city=>{
        res.send(city)
        res.end()
    }).catch((err)=>{
        res.status(400).send("data not found something went wrong")
    })
})

//update city
cityRoute.route('/cityupdate/:ctid/:ctname/:stid').put((req,res)=>{
    var ctid = req.params.ctid
    var ctname = req.params.ctname
    var stid = req.params.stid
    City.updateOne({"ctid":ctid},{"ctid":ctid,"ctname":ctname,"stid":stid}).then(city=>{
        res.send("data updated")
        res.end()
    }).catch((err)=>{
        res.send(err)
    })
})

//delete city
cityRoute.route('/citydelete/:ctid').delete((req,res)=>{
    var ctid=req.params.ctid
    City.deleteOne({"ctid":ctid}).then(city=>{
        if(city.deletedCount>0)
        {
        res.send("City Deleted")
        res.end()
        }
        else{
            res.send('city not deleted')
            res.end()
        }
    }).catch((err)=>{
        res.send(err)
        res.end()
    })
})

//show all city
cityRoute.route('/cityshow').get((req,res)=>{
    City.find().then(city=>{
        res.send(city)
        res.end()
    }).catch((err)=>{
        res.send(err)
        res.end()
    })
})

//get ID of last entered city to generate ID for next City
cityRoute.route('/getcityid').get((req,res)=>{
    City.find().sort({"ctid":-1}).limit(1).then(city=>{
        res.send(city)
        res.end()
        console.log(city)
    }).catch(err=>{
        res.send(err)
        res.end()
    })
})

//show cities by state Id
cityRoute.route('/citybystate/:stid').get((req,res)=>{
    City.find({"stid":req.params.stid}).then(city=>{
        res.send(city)
        res.end()
        console.table(city)
    }).catch(err=>{
        res.send(err)
        res.end()
    })
})
module.exports = cityRoute