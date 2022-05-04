const mongoose = require("mongoose")

const Payment = new mongoose.Schema({
    invoiceNo: {
        type:String,
        required: true
    },
    unit: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required:true
    },
    charge: {
        type: Number,
        required: true
    },
    Paid_Amount: {
        type: Number,
        required: true
    },
    mode: {
        type: String,
        required: true
    },
    payDate: {
        type: Date,
        required: true
    },
    refNo: {
        type: Number
    },
    remark: {
        type: String
    }
})

const payment = mongoose.model("PaymentEntry", Payment)
module.exports = payment