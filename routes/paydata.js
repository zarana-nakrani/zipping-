const express = require("express")
const req = require("express/lib/request")
const router = express.Router()
const Payment = require("../models/Payment")

router.post("/payment/post", (req,res) => {
    const { invoiceNo, unit, username, charge, mode, payDate, refNo, remark, Paid_Amount } = req.body
    console.log(req.body)
    if(!invoiceNo || !unit || !username || !charge || !mode || !payDate || !Paid_Amount) {
        return res.status(400).json({err:"Fill all fields"})
    }

    const payment = new Payment({invoiceNo, unit, username, charge, mode, payDate, refNo, remark})
    payment.save().then(()=>{
        res.status(200).json({successMsg:"Payment Entry Made Successfully"})
    }).catch(()=>{
        res.status(500).json({dberr:"Something went wrong on our side"})
    })
})

module.exports = router