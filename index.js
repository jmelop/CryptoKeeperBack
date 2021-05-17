const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Coonect to Database
mongoose.connect('mongodb://localhost/cryptokeeper');

const server = express();
server.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

server.use( cors( { origin : [''] } ) );

//Resources Users

const userRouter = require( './resources/users/index');
server.use('/users', userRouter);

server.listen(4000);
