const mongoose = require("mongoose");

const SocInfo = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    pincode: {
        type: Number
    },
    registration : {
        type: Number,
        required: true,
        unique: true
    },
    bankName: {
        type: String,
        required: true
    },
    branchName: {
        type: String,
        required: true
    },
    ifsc: {
        type: String,
        required: true
    },
    
})

module.exports = mongoose.model("societyInfo", SocInfo)