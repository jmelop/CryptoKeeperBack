const mongoose = require('mongoose');

var userSchema = mongoose.Schema({

    username: {
        type: String
    },
    name: {
        type: String
    },
    email: {
        type: String
    }
});

var user = mongoose.model('user', userSchema);

module.exports = user;