const { response } = require('express');
const userModel = require('./user.model');

module.exports = {
    getAllUsers: getAllUsers,
    getUser: getUser,
    addUser: addUser,
    updateUser: updateUser,
    deleteUser: deleteUser
}

// Function section

function getAllUsers(req, res) {
    userModel.find()
        .then(response => {
            console.log(response);
            res.json(response);
        })
};

function getUser(req, res) {
    let userId = req.params.email;

    userModel.findOne({ user: userId })
        .then(response => {

            console.log("Get user" + userId);
            res.json(response);
        }).catch((err) => {
            console.log(err)
        });
}

function addUser(req, res) {
    let body = req.body;

    userModel.findOne({ user: body.email })
        .then(u => {
            if (u === null) {
                userModel.create({

                    "name": body.name,
                    "email": body.email,
                    "password": body.password,
                    "role": body.role

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

function updateUser(req, res) {
    let body = req.body;
    let userId = req.params.email;
    userModel.updateOne({ user: userId }, { $set: body }, { runValidators: true })
        .then(response => {

            console.log("Updated User " + userId);
            res.json(response)
        })
}

function deleteUser(req, res) {
    let id = req.params.email;

    userModel.deleteOne({ user: id })
        .then(response => {

            console.log('Deleted User ' + id);
            res.json(response);
        })



}


