var express = require('express')
var router = express.Router()
var User = require('../models/user')

router.post('/signup', (req, res, next) => {
    if (
        req.body.email &&
        req.body.username &&
        req.body.password &&
        req.body.passwordConf
    ) {
        var userData = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            passwordConf: req.body.passwordConf
        }
        //use schema.create to insert data into the db
        User.create(userData, function (err, user) {
            if (err) {
                return next(err)
            } else {
                return res.redirect('/profile')
            }
        })
    }
})
module.exports = router