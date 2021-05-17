const mongoose = require('mongoose');

var cryptoSchema = mongoose.Schema({

    crypto: {
        type: String
    },
    price: {
        type: Number
    },
    weekPriceChange: {
        type: String
    },
    marketCap: {
        type: Number
    }
});

var crypto = mongoose.model('crypto', cryptoSchema);

module.exports = crypto;