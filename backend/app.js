const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const UserData = require('./model/userData');

const userDataRoute = require('./routes/userData');
const userRoute = require('./routes/user');

mongoose.connect("mongodb+srv://jacob:2YF2yDfJPxwo4oiE@cluster0-f3tj5.mongodb.net/fullStack")
    .then(() => {
        console.log('Connected to database')
    })
    .catch((error) => {
        console.log(error)
        console.log('Connection failed!');
    })

const db = mongoose.connection;

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-with, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST,PUT, DELETE, OPTIONS');
    next();
});

app.use(bodyParser.json());
app.use("/", express.static(path.join(__dirname, 'angular')));

app.use('/api/userData', userDataRoute);
app.use('/api/user', userRoute);
app.use('/api/fileUpload', userDataRoute);
app.use('/api/statistics', (req, res, next) => {
    db.db.stats(function(err, stats) {
        res.status(200).json({
            stats
        })
    });
});
app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "angular", "index.html"));
})

module.exports = app;