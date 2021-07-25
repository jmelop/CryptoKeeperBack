const bcrypt = require("bcrypt");
const authModel = require('./auth.model');
const jwt = require("jsonwebtoken");
require("dotenv").config();

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
            } else if (r.password == null) {
                res.status(404).send("Email o pasdword no válida");
            } else {
                if (!bcrypt.compareSync(password, r.password)) {
                    res.status(404).send("Email o pasdword no válida");
                } else {
                    const token = jwt.sign(
                        { email: r.email },
                        process.env.TOKEN_PASSWORD
                    );

                    return res.json({
                        user: r,
                        token: token
                    });
                }
            }

        }).catch((err) => console.log(err))

}

function register(req, res) {
    var newUser = new authModel(req.body);
    var error = newUser.validateSync();
    if (!error) {
        let passwordHash = bcrypt.hashSync(newUser.password, 4);

        authModel.create({

            name: newUser.name,
            email: newUser.email,
            password: passwordHash,
            role: newUser.role

        }).then(response => {
            res.json(response)
        }).catch((err) => {
            if (err.keyValue.email) {
                res.status(404).send("This email already exists");
            } else {
                res.status(500).send("Server error");
            }
        })
    } else {

        if (error.errors.email) {
            res.status(403).send("Email not valid");
        }

    }

}



