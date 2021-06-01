const { response } = require('express');
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
    let body = req.body;

    cryptoModel.findOne({ crypto: body.crypto })
        .then(u => {
            if (u === null) {
                cryptoModel.create({

                    "crypto": body.crypto,
                    "amount": body.amount,
                    "price": body.price,
                    "website": body.website,
                    "date": body.date,
                    "operation": body.operation,
                    "description": body.description

                }).then(response => {

                    console('Crypto added');
                    res.json(response);

                }).catch(

                    error => res.send(error));
            }
            else {
                res.send('Error, ya existe')
            }
        })

}

function updateCrypto(req, res) {
    let body = req.body;
    let cryptoId = req.params.crypto;
    cryptoModel.updateOne({ crypto: cryptoId }, { $set: body }, { runValidators: true })
        .then(response => {

            console.log("Updated Crypto " + cryptoId);
            res.json(response)
        })
}

function deleteCrypto(req, res) {
    let id = req.params.crypto;

    cryptoModel.deleteOne({ crypto: id })
        .then(response => {

            console.log('Deleted crypto ' + id);
            res.json(response);
        })



}


