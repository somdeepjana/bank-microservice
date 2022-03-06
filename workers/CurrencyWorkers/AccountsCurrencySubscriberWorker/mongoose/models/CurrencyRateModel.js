const mongoose= require("mongoose");
var Float = require('mongoose-float').loadType(mongoose, 4);

module.exports= new mongoose.Schema({
    _id: {
        type:String,
        trim: true,
        required: true,
        unique:true,
        // maxLength: 4
    },
    rate_refto_usd: {
        type: Float,
        required: true
    },
    description: {
        type:String,
        trim: true,
        required: true
    }
});