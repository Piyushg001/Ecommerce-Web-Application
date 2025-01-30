const express = require('express')
const stateRoute = express.Router()
let State = require('./state.model')

//Save State
stateRoute.route('/statesave/:stid/:stname').post((req,res)=>{
    var s = { stid:req.params.stid,
    stname:req.params.stname}
    let state = new State(s)
    state.save().then(state=>{
        res.status(200).json({'state':'state added succesfully'})
    }).catch(err=>{
        res.status(400).send("unable to save to database")
    })
})

//State Search
stateRoute.route('/statesearch/:stid').get((req,res)=>{
    var stid = req.params.stid
    State.findOne({"stid":stid}).then(state=>{
        res.send(state)
        res.end()
    }).catch(err=>{
        res.status(400).send('data not found something went wrong')
    })
})

//Update State
stateRoute.route('/stateupdate/:stid/:stname').put((req,res)=>{
    var stid = req.params.stid
    var stname = req.params.stname
    State.updateOne({'stid':stid},{'stid':stid,'stname':stname}).then(state=>{
        res.status(200).json({'state':'state updated successfully'})
    }).catch((err)=>{
        res.send(err)
        res.end()
    })
})

//delete state
stateRoute.route('/statedelete/:stid').delete((req,res)=>{
    var stid = req.params.stid
    State.deleteOne({'stid':stid}).then(state=>{
        if(state.deletedCount>0)
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
stateRoute.route('/stateshow').get((req,res)=>{
    State.find().then(state=>{
        res.send(state)
        res.end()
    }).catch(err=>{
        res.status(400).send('data not found something went wrong')
    })
})

// get ID of last Entered state to generate ID for next State
stateRoute.route('/getstateid').get((req,res)=>{
    State.find().sort({'stid':-1}).limit(1).then(state=>{
        console.log(state)
        res.send(state)
        res.end()
    }).catch(err=>{
        res.status(400).send('data not found something went wrong')
    })
})

module.exports=stateRoute