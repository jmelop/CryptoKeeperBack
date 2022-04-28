const mongoose = require('mongoose');

var newsSchema = mongoose.Schema({
    title: {
        type: String,
        minLength: [5, "The title is too short"],
        maxLength: [25, "The title is too large"],
        required: [true, "The title is required"]
    },
    subtitle: {
        type: String,
        minLength: [5, "The subtitle is too short"],
        maxLength: [15, "The subtitle is too large"],
        required: [true, "The subtitle is required"]
    },
    date: {
        type: String,
        required: [true, "The date is required"],
    },
    description: {
        type: String,
        minLength: [2, "The description is too short"],
        maxLength: [450, "The description is too large"],
        required: [true, "The description is required"]
    },
    url: {
        type: String,
        minLength: [6, "The url is too short"],
        maxLength: [45, "The url is too large"],
        required: [true, "The url is required"]
    }
});

var news = mongoose.model('news', newsSchema);

module.exports = news;