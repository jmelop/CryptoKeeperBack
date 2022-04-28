const { response } = require('express');
const userModel = require('./user.model');

module.exports = {
    getAllUsers: getAllUsers,
    getUser: getUser,
    updateUser: updateUser,
    deleteUser: deleteUser
}

// Function section

function getAllUsers(req, res) {
    userModel.find()
        .then(response => {
            res.json(response);
        })
};

function getUser(req, res) {
    let userId = req.params.email;

    userModel.findOne({ user: userId })
        .then(response => {
            res.json(response);
        }).catch((err) => {
            console.log(err)
        });
}

function updateUser(req, res) {
    let body = req.body;
    let userId = req.params.email;
    userModel.updateOne({ user: userId }, { $set: body }, { runValidators: true })
        .then(response => {
            res.json(response)
        })
}

function deleteUser(req, res) {
    let id = req.params.email;
    userModel.deleteOne({ user: id })
        .then(response => {
            res.json(response);
        })
}
