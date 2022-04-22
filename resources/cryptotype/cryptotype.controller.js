const { response } = require('express');
const cryptoTypeModel = require('./cryptotype.model');

module.exports = {
    getAllCryptoTypes: getAllCryptoTypes,
    getCryptoType: getCryptoType,
    addCryptoType: addCryptoType
}

// Function section

function getAllCryptoTypes(req, res) {
    cryptoTypeModel.find()
        .then(response => {
            console.log(response);
            res.json(response);
        }).catch((err) => {
            console.log(err)
        });
};

function getCryptoType(req, res) {
    let cryptoId = req.params.crypto;
    cryptoTypeModel.findOne({ crypto: cryptoId })
        .then(response => {
            console.log("Get crypto type" + cryptoId);
            res.json(response);
        }).catch((err) => {
            console.log(err)
        });
}

function addCryptoType(req, res) {
    var addCryptoType = new cryptoTypeModel(req.body);
    var error = addCryptoType.validateSync();
    if (!error) {
        addCryptoType
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
