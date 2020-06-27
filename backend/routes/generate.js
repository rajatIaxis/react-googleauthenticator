const router = require('express').Router();
let User = require('../models/users.models');
const Users = require('../models/users.models');
const { db } = require('../models/users.models');
const { authenticator } = require('otplib');
const { json } = require('express');

router.get('/', (req, res)=>{

    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: '+err));
});

router.get('/:id', (req, res)=>{
    Users.findById(req.params.id)
        .then(user => {
            const keyuri = authenticator.keyuri(user.email, "GAuth", user.secret);
            user.keyuri = keyuri;
            res.json(user);
        })
        .catch(err => res.status(400).json("Error: "+err));
});

router.post('/:email', (req, res)=>{
    // check db if email exists
    Users.find({email:req.params.email})
        .then(user=>{
            if(user.length==1){
                const keyuri = authenticator.keyuri(user[0].email, "GAuth", user[0].secret);
                res.status(200).json({
                    email:user[0].email,
                    keyuri:keyuri,
                    fresh:false
                    }
                );
                // res.status(200).json("user[0]");
                return;
            }
            
            // if email exists, send message that email already exists and return
            // if email doesnt exist

            // generate a new secret
            const secret = authenticator.generateSecret();
            const keyuri = authenticator.keyuri(req.params.email, "GAuth", secret);

            let user2 = new Users({
                email:req.params.email,
                secret:secret
            });

            user2.save()
                .then(()=>res.json({email:req.params.email, keyuri:keyuri}))
                .catch(err=> res.json(err));

            // send secret
        });

});

module.exports = router;