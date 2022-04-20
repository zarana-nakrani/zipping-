// const { Router } = require("express");
const express = require("express");
const router = express.Router();
const Owner = require("../models/Owner")

router.get("/ownerdata", (req, res) => {
    Owner.find().then((owner)=>{
        res.send(owner);
    }).catch((err)=> {
        res.status(500).json({"error":"Data not found"})
    })
})

router.get("/ownerdata/:id", (req, res) => {
    const { id } = req.params
    Owner.findById({"_id":id})
    .then((userdata)=>{
        res.status(200).json(userdata)
        console.log(userdata)
    })
    .catch(() => {
        res.status(500).json({"error":"cannot find data"})
    })
})

router.patch("/updatedata/:id",(req, res)=>{
    const { id } = req.params
    Owner.findByIdAndUpdate(id, req.body, {new:true})
    .then((userData) => {
        res.status(201).json(userData)
        console.log(userData)
    })
    .catch((err)=> {
        res.status(422).json(err)
        console.log(err)
    })
})

module.exports = router