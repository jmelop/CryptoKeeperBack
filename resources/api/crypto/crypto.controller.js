var mongoose = require("mongoose");
const cryptoModel = require('./crypto.model');
const cryptoTypeModel = require('../cryptotype/cryptotype.model');

module.exports = {
    getAllCryptos: getAllCryptos,
    getCrypto: getCrypto,
    addCrypto: addCrypto,
    updateCrypto: updateCrypto,
    deleteCrypto: deleteCrypto
}

// Function section

function getAllCryptos(req, res) {
    cryptoModel.find()
        .then(response => {
            res.json(response);
        })
};

function getCrypto(req, res) {
    let cryptoId = req.params.crypto;
    cryptoModel.findOne({ crypto: cryptoId })
        .then(response => {
            res.json(response);
        }).catch((err) => {
            console.log(err);
        });
}

function addCrypto(req, res) {
    var addCrypto = new cryptoModel(req.body);
    cryptoTypeModel.findOne({ shortname: req.body.crypto }).then(response => {
        var error = addCrypto.validateSync();
        if (!error && response) {
            addCrypto
                .save()
                .then((u) => {
                    res.json(u);
                })
                .catch((err) => res.status(500).json(err));
        } else if (!response) {
            res.status(404).send("That crypto doesn't exist");
        } else {
            if (error.errors.body) {
                res.status(404).send("The body is empty");
            }
        }
    }).catch((err) => {
        console.log(err);
    });
}

function updateCrypto(req, res) {
    let cryptoId = mongoose.Types.ObjectId.isValid(req.params.id);
    if (cryptoId) {
        cryptoModel.findByIdAndUpdate(req.params.id, req.body)
            .then((u) => {
                res.json(u);
            })
            .catch((err) => res.status(500).json(err));
    } else {
        res.status(404).send("That crypto does not exist");
    }
}

function deleteCrypto(req, res) {
    let cryptoId = mongoose.Types.ObjectId.isValid(req.params.id);
    if (cryptoId) {
        cryptoModel.findByIdAndDelete(req.params.id)
            .then((u) => {
                res.json(u);
            })
            .catch((err) => res.status(500).json(err));
    } else {
        res.status(404).send("That crypto does not exist");
    }
}
