const { response } = require('express');
const userModel = require('./users.model');

module.exports = {
    getAllUsers: getAllUsers,
    addUser: addUser
}

// Function section

function getAllUsers(req, res){
    userModel.find()
    .then(response => {
        console.log(response);
        res.json(response);
    })
};

function addUser(req, res){
    let body = req.body;

    userModel.create({

        "username": body.username,
        "name": body.name,
        "email": body.email

    }).then(response => {

        console('User added');
        res.json(response);

    }).catch(
        
        error => res.send(error));
        
}


