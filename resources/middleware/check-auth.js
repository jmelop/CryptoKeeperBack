const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
    try {
        const decoded = jwt.verify(req.headers.authorization, process.env.TOKEN_PASSWORD);
        req.userData = decoded;
        next();
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
}