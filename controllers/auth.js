const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {jwtSecret,jwtExpire} = require('../config/keys');

exports.signupController = async (req,res) =>{
    const {name,email,phone,password} = req.body;
    try{
        const user = await User.findOne({email:email});
        if(user){
            return res.status(400).json({
                errorMessage:'Email already exists',
            });
        }
        const newUser = new User();
        newUser.name = name;
        newUser.email = email;
        newUser.phone = phone;
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password,salt);
        

        await newUser.save();

        res.json({
            successMessage:'Registration success. Please signin',
        })


    }catch(err){
        console.log('signupcontroller error',err);
        res.status(500).json({
            errorMessage:'Server Error',
        })
    }
};


exports.signinController = async (req,res) =>{
   const {email,password} = req.body;
   
   try{
       const user = await User.findOne({email});
       if(!user){
           return res.status(400).json({
               errorMessage:'Invalid Credentials',
           });
       }

       const isMatch = await bcrypt.compare(password,user.password);
       if(!isMatch){
           return res.status(400).json({
               errorMessage:'Invalid credentials',
           });

        
       }

       const payload = {
        user:{
            _id:user._id,
            
        },
    };

    await jwt.sign(payload,jwtSecret,{expiresIn : jwtExpire},(err,token)=>{
        if(err) console.log('jwt error:',err);
        const { _id,name,email, phone} = user;
        res.json({
            token,
            user:{ _id,name,email, phone },
        });


    });


   }catch(err){
       console.log('inside signin controller error',err);
       res.status(500).json({
           errorMessage:'Server Error'
       });
   }
};