const express = require("express")
const router = express.Router()
const Entries = require("../models/InvoiceEntry")

router.post("/invoicedata", async (req, res) => {
    const { invoiceNo, invoiceDate, fromDate, toDate, unit, username, consumedUnits, waterCharge, securityCharge, cleaningCharge, festivalCharge, totalCharge, dueDate } = req.body
    console.log(req.body)
    if(!invoiceNo || !invoiceDate || !fromDate || !toDate || !unit || !username || !consumedUnits || !waterCharge || !securityCharge || !cleaningCharge || !festivalCharge || !totalCharge || !dueDate){
        console.log("Fill all fields")
        return res.status(400).json({errorMsg: "Fill all fields"})
    }
    Entries.findOne({invoiceNo}).then((entryExist)=> {
        if(entryExist){
            console.log("Entry Already Exist")
            return res.status(422).json({existerr: "Entry Already Exist"})
        }
        else{
            const entry = new Entries({invoiceNo, invoiceDate, fromDate, toDate, unit, username, consumedUnits, waterCharge, securityCharge, cleaningCharge, festivalCharge, totalCharge, dueDate})
            entry.save().then(()=>{
                console.log("Entry Added Successfully")
                res.status(200).json({successMsg:"Entry Added Successfully"})
            })
            .catch(()=>{
                console.log("Something's wrong please try again later")
                res.status(500).json({dbErr:"Something's wrong please try again later"});
            })
        }
    })
    
})

router.get("/getinvoice",async(req, res) => {
    const entries = await Entries.find({},{"invoiceNo":1, "unit":1, "username":1, "totalCharge":1})
    if(entries){
        res.send(entries)
    }
    else{
        res.status(500).json({error:"Internal error"})
    }

})

module.exports = router