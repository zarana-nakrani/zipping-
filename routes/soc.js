const express = require("express");
const router = express.Router();
const SocInfo = require("../models/SocietyInfo");
router.post("/society", (req, res) => {
    const { name, address, city, pincode, registration, bankName, branchName, ifsc } = req.body
    
    if(!name || !address|| !city|| !pincode|| !registration|| !bankName|| !branchName|| !ifsc) {
        res.status(422).json({"error" : "Please fill all the fields"})
    }
    SocInfo.findOne({registration: registration})
    .then((SocietyExist)=>{
        if(SocietyExist) {
            return res.status(422).json({error:"Society Already Added"})
        };
    })
    
    const societyInfo = new SocInfo({name, address, city, pincode, registration, bankName, branchName, ifsc});
    societyInfo.save().then(()=>{
        res.status(200).json({"Message":"OK"})
        console.log("data added successfully");
    }).catch((err)=>{
        res.status(500)
    })
})

module.exports = router