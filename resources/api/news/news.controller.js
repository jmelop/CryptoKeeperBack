const { response } = require('express');
const newsModel = require('./news.model');

module.exports = {
    getAllNews: getAllNews,
    getNews: getNews,
    addNews: addNews,
    updateNews: updateNews,
    deleteNews: deleteNews
}

// Function section

function getAllNews(req, res) {
    newsModel.find()
        .then(response => {
            res.json(response);
        }).catch((err) => {
            console.log(err)
        });
};

function getNews(req, res) {
    let newsId = req.params.news;
    newsModel.findOne({ news: newsId })
        .then(response => {
            res.json(response);
        }).catch((err) => {
            console.log(err)
        });
}

function addNews(req, res) {
    var addNews = new newsModel(req.body);
    var error = addNews.validateSync();
    if (!error) {
        addNews
            .save()
            .then((u) => {
                res.json(u);
            })
            .catch((err) => res.status(500).json(err));
    } else {
        if (error.errors.body) {
            res.status(404).send("The body is empty");
        }
    }
}

function updateNews(req, res) {
    let newsId = mongoose.Types.ObjectId.isValid(req.params.id);
    if (newsId) {
        newsModel.findByIdAndUpdate(req.params.id, req.body)
            .then((u) => {
                res.json(u);
            })
            .catch((err) => res.status(500).json(err));
    } else {
        res.status(404).send("That news does not exist");
    }
}

function deleteNews(req, res) {
    let newsId = mongoose.Types.ObjectId.isValid(req.params.id);
    if (newsId) {
        newsModel.findByIdAndDelete(req.params.id)
            .then((u) => {
                res.json(u);
            })
            .catch((err) => res.status(500).json(err));
    } else {
        res.status(404).send("That news does not exist");
    }
}
