var mongoose = require("mongoose");
const cryptoModel = require('./crypto.model');

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
            console.log(response);
            res.json(response);
        })
};

function getCrypto(req, res) {
    let cryptoId = req.params.crypto;

    cryptoModel.findOne({ crypto: cryptoId })
        .then(response => {

            console.log("Get crypto" + cryptoId);
            res.json(response);
        }).catch((err) => {
            console.log(err)
        });
}

function addCrypto(req, res) {
    var addCrypto = new cryptoModel(req.body);
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
