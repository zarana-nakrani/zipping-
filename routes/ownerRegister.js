const express = require("express");
const router = express.Router();
const Owner = require("../models/Owner")
const Occupier = require("../models/Occupier");
router.post("/ownerregister", (req, res) => {
    const { ownername, email, area, units, contact, houseNo, building, startDate } = req.body;

    if(!ownername || !email || !area || !units || !contact || !houseNo || !startDate) {
        res.status(400).json({error: "Please fill all fields"})
    }

    Owner.findOne({email: email, houseNo: houseNo, building:building})
    .then((OwnerExist) => {
        if(OwnerExist){
            return res.status(422).json({error:"Owner already exist"});
        }
        else{
            const ownerInfo = new Owner({ownername, email, area, units, contact, houseNo, building, startDate});
    ownerInfo.save().then(()=>{
        console.log("Data added successfully")
        res.status(200)
    })
    .catch((err)=>{
        res.status(500);
    });
        }
    });

})

// router.get("/ownerregisterget",(req,res) => {
//     Owner.find({},{"houseNo":1, "building":1, "_id":0}).then(owner => {
//         res.send(owner)
//     }).catch((err)=>{
//         res.status(500).send(err)
//     })
// })

router.post("/registeroccupier", (req, res) => {
    const { housenum, building, occupiername, email, contact, memnum } = req.body;

    if(!housenum|| !occupiername|| !contact|| !memnum) {
        res.status(400).json({"error": "Fill all required fields"})
    }
    Occupier.findOne({contact: contact, building: building, housenum: housenum}).then((OccupierExist) => {
        if(OccupierExist) {
            return res.status(422).json({error: "Occupier Already Exist"})
        }
        else{
            const occupierInfo = new Occupier({housenum, building, occupiername, email, contact, memnum})
            occupierInfo.save().then(()=>{
                res.status(200)
                console.log("Data added successfully")
            }).catch((err)=> {
                console.log(err);
                res.status(500).json({"error": "Something wrong on our side"});
            })
        }
    })


}) 
module.exports = router;