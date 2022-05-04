const mongoose = require("mongoose")
const InvoiceEntry = new mongoose.Schema({
    invoiceNo: {
        type: String,
        required: true
    },
    invoiceDate: {
        type: Date,
        required: true
    }, 
    fromDate: {
        type: Date,
        required: true
    }, 
    toDate: {
        type: Date,
        required: true
    },
    unit: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    }, 
    consumedUnits: {
        type: Number,
        required: true
    }, 
    waterCharge: {
        type: Number,
        required: true
    }, 
    securityCharge: {
        type: Number,
        required: true
    }, 
    cleaningCharge:{
        type: Number,
        required: true
    }, 
    festivalCharge:{
        type: Number,
        required: true
    }, 
    totalCharge:{
        type: Number,
        required: true
    },  
    dueDate: {
        type: Date,
        required: true
    }
})

const Entries = mongoose.model("entry", InvoiceEntry)
module.exports = Entries