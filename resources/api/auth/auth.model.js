const mongoose = require('mongoose');

var authSchema = mongoose.Schema({
    name: {
        type: String,
        minLength: [2, "The name is too short"],
        maxLength: [100, "The name is too large"],
    },
    email: {
        type: String,
        unique: true,
        validate: {
            validator: function (v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Enter a valid email",
        },
        required: [true, "Email required"],
    },
    password: {
        type: String,
        minLength: [6, "The password is too short"],
        maxLength: [300, "The password is too large"],
        required: [true, "Password required"]
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    }
});

var auth = mongoose.model('users', authSchema);

module.exports = auth;
