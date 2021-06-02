    const mongoose = require('mongoose');

var authSchema = mongoose.Schema({

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

var auth = mongoose.model('users', authSchema);

module.exports = auth;