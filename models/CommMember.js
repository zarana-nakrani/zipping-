const { default: mongoose } = require("mongoose")
const Role = require('../models/Committee')

const CommitteeMember = new mongoose.Schema({
    memberId:{
        type:mongoose.Schema.Types.ObjectId,
        unique: true,
        required: true
    },
    role:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'Role'
    },
    membername: {
        type: String,
        required:true
    },
    contact: {
        type:Number,
        required:true
    }
})

const Member = mongoose.model("member", CommitteeMember)
module.exports = Member