// const express = require("express");
// const router = express.Router();
// const User = require("../models/User");

// router.post("users/:id", (req, res) => {
//     const { id } = req.params
//     User.findById({"_id":id}).then(()=>{
//         res.send(200).json({"Message":"Got Data"})
//     })
//     .catch((err)=>{
//         res.status(500).json({"error":"cannot get data"})
//     })

// })