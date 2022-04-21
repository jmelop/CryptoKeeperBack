const mongoose = require('mongoose');

var cryptoDataSchema = mongoose.Schema({

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

var cryptodata = mongoose.model('cryptodatas', cryptoDataSchema);

module.exports = cryptodata;
