const mongoose= require("mongoose");
var Float = require('mongoose-float').loadType(mongoose, 4);

module.exports= new mongoose.Schema({
    account_id: {
        type:String,
        trim: true,
        required: true,
        unique:true,
        maxLength: 120
    },
    balance_amount: {
        type: Float,
        required: true
    },
    limit_amount: {
        type: Float,
        required: true
    },
    lien_amount: {
        type: Float,
        required: true
    },
    customer_id: {
        type: String,
        required: true
    },
    currency:{
        type: String,
        ref: "CurrencyRate",
        required: true
    }
}, {timestamps: true, optimisticConcurrency: true});