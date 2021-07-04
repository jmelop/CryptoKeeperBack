const { response } = require('express');
const cryptoDataModel = require('./cryptodata.model');

module.exports = {
    getAllCryptos: getAllCryptos,
    getCrypto: getCrypto
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





