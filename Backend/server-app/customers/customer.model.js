var mongoose = require ('mongoose')
const Schema = mongoose.Schema
var Customer = new Schema({
    cid:{type:Number},
    cname:{type:String},
    ccontactno:{type:Number},
    cemail:{type:String},
    caddress:{type:String},
    cstid:{type:Number},
    cctid:{type:Number},
    cuserid:{type:String},
    cuserpass:{type:String},
    cpicname:{type:String}
    },
    {
        collection:"customer"
    }
)
module.exports = mongoose.model('Customer',Customer)