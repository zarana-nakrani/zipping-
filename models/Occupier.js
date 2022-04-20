const mongoose = require("mongoose");

const OccupierSchema = new mongoose.Schema({
    building: {
        type: String
    },
    housenum: {
        type: String,
        required: true
    },
    occupiername : {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    contact: {
        type: String,
        required: true
    },
    memnum: {
        type: Number,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate : {
        type: Date,
    } 
})

module.exports = mongoose.model("occupierInfo", OccupierSchema);