var mongoose = require ('mongoose')
const Schema = mongoose.Schema
var Vendor = new Schema({
    VUserId:{type:String},
    VUserPass:{type:String},
    VVendorName:{type:String},
    VAddress:{type:String},
    VContact:{type:Number},
    VEmail:{type:String},
    VPicName:{type:String},
    VId:{type:Number}
    },
    {
        collection:"vendor"
    }
)
module.exports = mongoose.model('Vendor',Vendor)