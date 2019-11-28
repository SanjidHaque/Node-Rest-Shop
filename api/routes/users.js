const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcryptjs');


router.post('/signup', (req, res, next) => {
    User.find({ email: req.body.email})
    .exec()
    .then(user => {
        if (user.length >= 1) {
            return res.status(409).json({
                message: 'Mail exists'
            });
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    });
                } else {
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash
                    });
                    user.save()
                    .then(reply => {
                        res.status(201).json({
                            message: 'User created'
                        });
                    })
                    .catch(error => {
                        res.status(500).json({
                            error: error
                        });
                    });
                }
            });
        }
    });
});



router.delete('/:userId', (req, res, next) => {
    const id = req.params.userId;
    User.remove({ _id: id })
        .exec()
        .then(response => {
            res.status(200).json({
                message: 'User deleted'
            });
        })
        .catch(error => {
            res.status(500).json({
                error: error
            });
        });

});


module.exports = router;