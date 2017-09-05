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

var routes = require('./app/routes/user_routes')
app.use('/', routes)

app.listen(port, () => {
    console.log('Running on ' + port)
})