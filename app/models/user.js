var mongoose = require('mongoose')
var bcrypt = require('bcrypt')

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    passwordConf: {
        type: String,
        required: true,
    }
})

UserSchema.pre('save', function (next) {
    var user = this
    console.log(user);
    bcrypt.hash(user.password, 12, (err, hash) => {
        if (err) next(err)
        user.password = hash
        next()
    })
})

var User = mongoose.model('User', UserSchema)
module.exports = User
