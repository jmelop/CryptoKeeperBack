const mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    name: {
        type: String,
        minLength: [2, "Name too short"],
        maxLength: [15, "Name too large"],
        required: [true, "The name is required"]
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
        required: [true, "Password required"],
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    }
});

var user = mongoose.model('user', userSchema);

module.exports = user;
