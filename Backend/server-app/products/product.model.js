var mongoose = require('mongoose')
const Schema = mongoose.Schema

var Product = new Schema({
    pid:{type:Number},
    pname:{type:String},
    pprice:{type:Number},
    oprice:{type:Number},
    ppicname:{type:String},
    pcatgid:{type:Number},
    VId:{type:Number}
    },
    {
        collection:"product"
    }
)
module.exports = mongoose.model('Product',Product)