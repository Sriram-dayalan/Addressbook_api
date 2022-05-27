const express = require('express');
const router = express.Router();

const{
    registeruser,
    loginuser,
} = require(`../controller/usercontroller`);

//  @route      POST api/users/register
//  @desc       Register user
//  @access     Public
router.post(`/register`, registeruser)

//  @route      POST api/users/login
//  @desc       Login user
//  @access     Public

router.post(`/login`, loginuser)

module.exports = router;