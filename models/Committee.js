const mongoose = require('mongoose');

const CommitteeRole = new mongoose.Schema({
    roleId : {
        type: Number,
        unique:true,
        required: true
    },
    rolename: {
        type:String,
        required: true
    }
})

const Role = mongoose.model('role',CommitteeRole);
module.exports = Role

