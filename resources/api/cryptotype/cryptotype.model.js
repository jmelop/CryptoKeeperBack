const mongoose = require('mongoose');

var cryptoTypeSchema = mongoose.Schema({
    name: {
        type: String,
        minLength: [2, "The name is too short"],
        maxLength: [10, "The name is too large"],
        required: [true, "The name is required"]
    },
    shortname: {
        type: String,
        minLength: [2, "The shortname too short"],
        maxLength: [4, "The shortname is too large"],
        required: [true, "The shortname is required"]
    }
});

var cryptotype = mongoose.model('cryptotype', cryptoTypeSchema);

module.exports = cryptotype;
