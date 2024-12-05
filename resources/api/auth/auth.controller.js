const bcrypt = require("bcrypt");
const authModel = require("./auth.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  login,
  register,
};

// Function section
function login(req, res) {
  const { email, password } = req.body;
  return authModel
    .findOne({ email: email })
    .then((userLogged) => {
      if (!userLogged) {
        res.status(404).send("There is not any user with that email");
      } else if (userLogged.password == null) {
        res.status(404).send("Email o pasdword no válida");
      } else {
        if (!bcrypt.compareSync(password, userLogged.password)) {
          res.status(404).send("Email o pasdword no válida");
        } else {
          const token = jwt.sign(
            { email: userLogged.email },
            process.env.TOKEN_PASSWORD
          );
          return res.json({
            user: userLogged,
            token: token,
          });
        }
      }
    })
    .catch((err) => console.log(err));
}

function register(req, res) {
  const newUser = new authModel(req.body);
  const error = newUser.validateSync();

  if (error) {
    return res.status(400).json({
      success: false,
      message: "Validation error",
      error: error.errors.email?.message || error.errors,
    });
  }

  const passwordHash = bcrypt.hashSync(newUser.password, 4);
  authModel
    .create({
      name: newUser.name,
      email: newUser.email,
      password: passwordHash,
      role: newUser.role,
    })
    .then((response) => {
      res.status(201).json({
        success: true,
        message: "User created successfully",
        data: response,
      });
    })
    .catch((err) => {
      const isDuplicateEmail = err.keyValue?.email;
      const status = isDuplicateEmail ? 409 : 500;
      const message = isDuplicateEmail
        ? "This email already exists"
        : "Server error";

      res.status(status).json({
        success: false,
        message,
        error: isDuplicateEmail ? null : err,
      });
    });
}
