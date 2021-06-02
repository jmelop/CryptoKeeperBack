    const mongoose = require('mongoose');

var userSchema = mongoose.Schema({

    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    role: {
        type: String
    }
});

var user = mongoose.model('user', userSchema);

module.exports = user;