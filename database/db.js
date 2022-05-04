const mongoose = require('mongoose');

const connectDB= async()=>{
    try{
        await mongoose.connect('mongodb+srv://zarana:zarnabuma@cluster0.bzltt.mongodb.net/projectbuma?retryWrites=true&w=majority',{
           useNewUrlParser:true,
           useUnifiedTopology: true
    });

       console.log('database connection')

    }catch (err){
        console.log(err);

    }
};

module.exports = connectDB; 