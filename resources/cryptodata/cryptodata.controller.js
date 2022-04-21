const { response } = require('express');
const cryptoDataModel = require('./cryptodata.model');

module.exports = {
    getAllCryptos: getAllCryptos,
    getCrypto: getCrypto,
    addCrypto: addCrypto
}

// Function section

function getAllCryptos(req, res) {
    cryptoDataModel.find()
        .then(response => {
            console.log(response);
            res.json(response);
        }).catch((err) => {
            console.log(err)
        });
};

function getCrypto(req, res) {
    let cryptoId = req.params.crypto;
    cryptoDataModel.findOne({ crypto: cryptoId })
        .then(response => {
            console.log("Get crypto" + cryptoId);
            res.json(response);
        }).catch((err) => {
            console.log(err)
        });
}

function addCrypto(req, res) {
    var addCrypto = new cryptoDataModel(req.body);
    var error = addCrypto.validateSync();
    if (!error) {
        addCrypto
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
