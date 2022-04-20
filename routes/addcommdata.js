const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router();
const Role = require('../models/Committee');
const Member = require('../models/CommMember');

router.post("/committee/role", (req, res)=>{
    const { roleId, rolename } = req.body;
    if(!roleId || !rolename){
        return res.status(400).json({error: "Fill all data"})
    }
    Role.findOne({roleId, rolename}).then((RoleExist)=>{
            if(RoleExist){
                return res.status(422).json({errmsg:"Role already exist"})
            }
            else{
                const role = new Role({ roleId, rolename })
                role.save().then(()=> {
                    res.status(201).json({success:"Data added successfully"})
                    console.log("data added successfully")
                })
                .catch((err)=>{
                    console.log(err)
                    res.status(500).json({errMsg:"Something went wrong on our side"});
                })
            }
        })
})

router.post('/committee/member', async (req, res)=>{
    const { membername, contact } = req.body
    const memberId = mongoose.Types.ObjectId();
    const id = req.body.rolename
    console.log(id)
    const role = await Role.findOne({rolename:id}).select('_id')
    if(!membername || !contact || !memberId || !role){
        return res.status(400).json({error: "Something went wrong"})
    }

    Member.findOne({memberId, role: role}).then((MemberExist)=> {
        if(MemberExist){
            return res.status(422).json({errmsg:"Member already exist"})
        }
        else{
            const member = new Member({membername , contact , memberId , role})
            member.save().then(()=> {
                res.status(201).json({success:"Data added successfully"})
                console.log("data added successfully")
            })
            .catch((err)=>{
                console.log(err)
                res.status(500).json({errMsg:"Something went wrong on our side"});
            })
        }
    })
        
})

router.patch('/comm/member/update/:id', async (req, res) => {
    const { id } = req.params
    const response = await Member.findByIdAndUpdate(id,req.body, {new: true} )
    res.status(201).json({success:"Updated successfully"})
    if(!response){
        return res.status(422).json({errmsg: "Something went wrong"})
    }
})

module.exports = router

