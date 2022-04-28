const mongoose = require('mongoose');

var cryptoSchema = mongoose.Schema({
    crypto: {
        type: String,
        minLength: [2, "The name is too short"],
        maxLength: [10, "The name is too large"],
        required: [true, "Cryptocurrency name is required"]
    },
    amount: {
        type: Number,
        required: [true, "The amount is required"],
    },
    price: {
        type: Number,
        required: [true, "The price is required"],
        maxLength: [100, "The number is too large"],
    },
    website: {
        type: String,
        maxLength: [15, "The website name is too large"],
    },
    date: {
        type: String,
        required: [true, "The date is required"],
    },
    operation: {
        type: String,
        enum: ["Buy", "Sell"],
        default: "Buy"
    },
    description: {
        type: String,
        maxLength: [1500, "The description is too large"],
    }
});

var crypto = mongoose.model('crypto', cryptoSchema);

module.exports = crypto;