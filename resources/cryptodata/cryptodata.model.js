const mongoose = require('mongoose');

var cryptoDataSchema = mongoose.Schema({

    name: {
        type: String
    },
    shortname: {
        type: String
    }
});

var cryptodata = mongoose.model('cryptodatas', cryptoDataSchema);

module.exports = cryptodata;