const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

const config_db = require('./pub_config/db')

const app = express()
const port = 8080

/*
    Connecting to MongoDB
*/
mongoose.connect(config_db.url)
var db = mongoose.connection

db.once('open', () => {
    console.log('\nconnected to database');
})

app.use(bodyParser.urlencoded({ extended: true }))

/*
Warning The default server-side session storage, MemoryStore, is purposely
 not designed for a production environment. 
 It will leak memory under most conditions, 
 does not scale past a single process, 
 and is meant 
 for debugging and developing.
 
 *here store set the storing to mondodb ;)
*/
app.use(session({
    secret: 'My secret with you ;)',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: db
    })
}))

var routes = require('./app/routes/user_routes')
app.use('/', routes)

app.listen(port, () => {
    console.log('Running on ' + port)
})