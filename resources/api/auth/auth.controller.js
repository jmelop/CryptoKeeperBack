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

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
  }

  authModel
    .findOne({ email })
    .then((userLogged) => {
      if (!userLogged) {
        return res.status(404).json({
          success: false,
          message: "No user found with that email",
        });
      }

      if (!userLogged.password) {
        return res.status(400).json({
          success: false,
          message: "Invalid email or password",
        });
      }

      const isPasswordValid = bcrypt.compareSync(password, userLogged.password);
      if (!isPasswordValid) {
        return res.status(400).json({
          success: false,
          message: "Invalid email or password",
        });
      }

      const token = jwt.sign(
        { email: userLogged.email, id: userLogged._id },
        process.env.TOKEN_PASSWORD,
        { expiresIn: "1h" }
      );

      return res.status(200).json({
        success: true,
        message: "Login successful",
        user: {
          id: userLogged._id,
          name: userLogged.name,
          email: userLogged.email,
          role: userLogged.role,
        },
        token,
      });
    })
    .catch((err) => {
      console.error("Error during login:", err);
      res.status(500).json({
        success: false,
        message: "Server error",
        error: err,
      });
    });
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
        success: 'OK',
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
        success: 'KO',
        message,
        error: isDuplicateEmail ? null : err,
      });
    });
}
