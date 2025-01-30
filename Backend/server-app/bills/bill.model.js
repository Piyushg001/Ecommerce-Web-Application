var mongoose = require('mongoose')
const Schema = mongoose.Schema
var Bill = new Schema({
    billid:{type:Number},
    billdate:{type:Date},
    cid:{type:Number},
    pid:{type:Number}
},
{
    collection:'bill'
})

module.exports = mongoose.model("Bill",Bill)