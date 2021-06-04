const { response } = require('express');
const bcrypt = require("bcrypt");
const authModel = require('./auth.model');

module.exports = {
    login, register
}

// Function section

function login(req, res) {
    const { email, password } = req.body;
    
    return authModel.findOne({ email: email })
        .then(r => {

            if (!r) {
                res.status(404).send("There is not any user with that email")
            } else if (password !== r.password) {
                res.status(404).send("Email o pasdword no válida");
            } else {
                return res.json('OK')
            }

        }).catch((err) => console.log(err))

}

function register(req, res) {
    var newUser = req.body;

    authModel.create({

        'name': newUser.name,
        'email': newUser.email,
        'password': newUser.password,
        'role': newUser.role

    }).then(response => {
        res.json(response).catch(

            error => res.send(error));
    })
}





