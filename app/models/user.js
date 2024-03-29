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

/*
authenticate input against database
*/
UserSchema.statics.authenticate = (email, password, callback) => {
    User.findOne({ email: email })
    .exec(function (err, user) {
        if (err) {
            return callback(err)
        } else if (!user) {
            var err = new Error('User not found.')
            err.status = 401
            return callback(err)
        }
        bcrypt.compare(password, user.password, function (err, result) {
            if (result === true) {
                return callback(null, user)
            } else {
                return callback()
            }
        })
    })
}

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
