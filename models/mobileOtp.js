var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mobileOtpSchema = mongoose.Schema({
    phone: {
        type: String,
        require: true      
    },
    otp:{
        type: String,
        required: true
    },
    operation:{
        type: String,
        required: true
    },
    tryCount: {
        type: Number,
        min: 0,
        max: 3,
        required: true
        
    },
    used: {
        type: Boolean,
        default: false,
        required: true
    }
},
{
    timestamps: true
});
var mobileOtp = mongoose.model('mobileOtp', mobileOtpSchema);
module.exports = mobileOtp;