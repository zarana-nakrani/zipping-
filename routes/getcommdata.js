const express = require('express');
const req = require('express/lib/request');
const router = express.Router();
const Role = require('../models/Committee')
const Member = require('../models/CommMember');

router.get('/committee/role/get', async (req, res) => {
    const role = await Role.find({},{"_id":0, "__v":0})
    res.send(role);
    if(!role){
        return res.status(500).json({"error":"Data not found"})
    }
})

router.get('/committee/member/get', async (req, res)=>{
    const member = await Member.aggregate([
        {
            $lookup : {
                from: 'roles',
                localField: "role",
                foreignField: "_id",
                as: "role_data"
            }
        }
    ])
    res.status(200);
    res.send(member);

})

router.get('/committee/member/get/:rolename/:id', async (req, res) => {
    const { id } = req.params
    const member = await Member.findById({"_id":id})
    res.send(member);
    if(!member){
        return res.status(404).json({error:"Cannot find data"})
    }
})

router.delete('/comm/member/delete/:id', async (req, res)=>{
    const { id } = req. params
    const member = await Member.findByIdAndDelete({"_id":id})
    console.log(member);
    res.status(201).json({success:"deleted successfully"})
    if(!member){
        return res.status(404).json({error:"Cannot find data"})
    }
})

module.exports = router