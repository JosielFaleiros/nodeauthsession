var express = require('express')
var router = express.Router()
var User = require('../models/user')

router.get('/', (req, res, next) => {
    res.send('Ok :D')
})

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
                req.session.userId = user._id
                return res.redirect('/profile')
            }
        })
    }
})

router.post('/login', (req, res, next) => {
    if (req.body.logemail && req.body.logpassword) {
        User.authenticate(req.body.logemail, req.body.logpassword, (error, user) => {
            if (error || !user) {
                var err = new Error('Wrong email or password.')
                err.status = 401
                return next(err)
            } else {
                req.session.userId = user._id
                req.session.email = user.email
                console.log(req.session)
                return res.redirect('/profile')
            }
        })
    } else {
        var err = new Error('All fields required.')
        err.status = 400
        return next(err)
    }
})

module.exports = router