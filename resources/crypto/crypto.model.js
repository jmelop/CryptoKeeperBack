    const mongoose = require('mongoose');

var cryptoSchema = mongoose.Schema({

    crypto: {
        type: String,
        minLength: [2, "Name too short"],
        maxLength: [10, "Name too large"],
        required: [true, "Cryptocurrency name is required"]
    },
    amount: {
        type: Number,
        required: [true, "The amount is required"],
    },
    price: {
        type: String,
        required: [true, "The price is required"],
        maxLength: [100, "The number is too large"],
    },
    website: {
        type: String,
        minLength: [2, "Website name too short"],
        maxLength: [15, "Website name too large"],
    },
    date: {
        type: Date,
        required: [true, "The date is required"],
    },
    operation: {
        type: String,
        enum: ["Buy", "Sell"],
        default: "Buy"
    },
    description: {
        type: String,
        minLength: [2, "The description is too short"],
        maxLength: [1500, "The description is too large"],
    }
});

var crypto = mongoose.model('crypto', cryptoSchema);

module.exports = crypto;