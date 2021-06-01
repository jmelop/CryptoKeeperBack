    const mongoose = require('mongoose');

var cryptoSchema = mongoose.Schema({

    crypto: {
        type: String
    },
    amount: {
        type: Number
    },
    price: {
        type: String
    },
    website: {
        type: String
    },
    date: {
        type: Date
    },
    operation: {
        type: String
    },
    description: {
        type: String
    }
});

var crypto = mongoose.model('crypto', cryptoSchema);

module.exports = crypto;