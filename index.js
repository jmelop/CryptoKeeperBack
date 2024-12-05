const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');

// Limit repeated requests
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

// Connect to Database
mongoose.connect('mongodb://0.0.0.0:27017/cryptokeeper', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Database connected successfully'))
.catch(err => console.error('Database connection error:', err));

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

server.use( express.json() );

// Limiter
server.use(limiter);

// Resources Crypto
const cryptoRouter = require( './resources/api/crypto/index');
const cryptoTypeRouter = require( './resources/api/cryptotype/index');
const userRouter = require( './resources/api/user/index');
const authRouter = require('./resources/api/auth/auth.router');
server.use('/cryptos', cryptoRouter);
server.use('/cryptotype', cryptoTypeRouter);
server.use('/users', userRouter);
server.use("/", authRouter);

server.listen(4000, () => {
    console.log('Server is running on http://localhost:4000');
});
