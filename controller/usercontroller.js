const user = require(`../models/user`);
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const colors = require('colors');
const res = require(`express/lib/response`);

//  @route      POST api/users/login
//  @desc       Login user
//  @access     Public

const loginuser = async (req,res) => {
    try{
        const {email, password} = req.body;

        if(!email || validateEmail(email)) {
            return res.status(400).json({msg: 'Email is required'});
        }
        if(!password || password.length < 6) {
            return res.status(400).json({msg: 'A valid Password with a minimum of 6 characters is required'});
        }

        let newuser = await user.findOne({email});

        if(!newuser){
            return res.status(400).json({msg: 'invalid email and/or password'});
        }

        const isMatch = await bcrypt.compare(password, newuser.password);

        if(!isMatch) {
            return res.status(400).json({msg: 'invalid password'});
        }


        const payload = {
            user:{
                id: newuser._id
            }
        }
    
        jwt.sign (payload, process.env.JWT_SECRET,{
            expiresIn: 43200
        }, (err, token) => {
            if(err) throw err;
            res.json(token);
        } )


    }catch (err) {
        console.log(`ERROR: ${err.message}`.bgRed.underline.bold);
        res.status(500).send('Server Error');
    }
}

//  @route      POST api/users/register
//  @desc       Register user
//  @access     Public

const registeruser = async (req,res) => {
    try{
        const {email, password} = req.body;

        if(!email || validateEmail(email)) {
            return res.status(400).json({msg: 'Email is required'});
        }
        if(!password || password.length < 6) {
            return res.status(400).json({msg: 'A valid Password with a minimum of 6 characters is required'});
        }

        let newuser = await user.findOne({email});

        if(newuser){
            return res.status(400).json({msg: 'User already exists'});
        }
        
        newuser = new user({email, password});

        const salt = await bcrypt.genSalt(10);

        newuser.password = await bcrypt.hash(password, salt);

        await newuser.save();

        const payload = {
            user:{
                id: newuser._id
            }
        }
    
        jwt.sign (payload, process.env.JWT_SECRET,{
            expiresIn: 43200
        }, (err, token) => {
            if(err) throw err;
            res.json(token);
        } )


    }catch (err) {
        console.log(`ERROR: ${err.message}`.bgRed.underline.bold);
        res.status(500).send('Server Error');
    }
}


function validateEmail(email){
    const regex = /\$+@\$+\.\$+/;
    return regex.test(email);
}

module.exports ={
    registeruser,
    loginuser
}