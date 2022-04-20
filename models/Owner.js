const mongoose = require("mongoose");

const OwnerSchema = new mongoose.Schema({
    ownername: {
        type: String,
        required : true
    },
    email: {
        type: String,
        required: true
    },
    area: {
        type: Number,
        required : true
    },
    units: {
        type: String,
        required: true
    },
    contact: {
        type: Number,
        required: true
    },
    houseNo: {
        type: String,
        required: true
    },
    building: {
        type: String
    },
    startDate : {
        type: Date,
        required: true
    },
    endDate : {
        type: Date
    }
})

module.exports = mongoose.model("ownerInfo",OwnerSchema)