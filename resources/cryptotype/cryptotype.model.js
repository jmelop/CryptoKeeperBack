const mongoose = require('mongoose');

var cryptoTypeSchema = mongoose.Schema({

    name: {
        type: String,
        minLength: [2, "Name too short"],
        maxLength: [10, "Name too large"],
        required: [true, "The name is required"]
    },
    shortname: {
        type: String,
        minLength: [2, "Name too short"],
        maxLength: [4, "Name too large"],
        required: [true, "The shortname is required"]
    }
});

var cryptotype = mongoose.model('cryptotype', cryptoTypeSchema);

module.exports = cryptotype;
