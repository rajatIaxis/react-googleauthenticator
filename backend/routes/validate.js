const router = require('express').Router();
let User = require('../models/users.models');
const Users = require('../models/users.models');
const { db } = require('../models/users.models');
const { authenticator } = require('otplib');
const { json } = require('express');
authenticator.options = { window: 1 };

router.post('/' , (req, res)=>{
    res.status(400).json("Bad request");
});

router.post('/:email', (req, res)=>{
    //check if code is sent in headers
    //if not, send 400 status and return
    if(!req.body.hasOwnProperty("code") || isNaN(parseInt(req.body.code))){
        res.status(400).json("enter valid code");
        return;
    }
    const token = req.body.code;
    // check db if email exists
    Users.find({email:req.params.email})
        .then(user=>{
            // if email doesnt exist, send 400 status and return 
            if(user.length==0){
                res.status(400).json("invalid user");
                return;
            }

            // if email does exist, retrieve code for the key and verify
            const secret = user[0].secret;
            authenticator.window = 2;
            const isValid = authenticator.check(token, secret);

            // if the code doesnt match, send 400 status and return error text
            if(!isValid){
                res.json("wrong code " + authenticator.generate(secret));
            } else{
                res.json("success " + authenticator.generate(secret));
            }
            // if the code matches, send success

        });
});

module.exports = router;