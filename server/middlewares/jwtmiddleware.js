const jwt = require("jsonwebtoken");


// JWT token generation
const generateJwtToken = (userData) => {
    return jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: '1h' }); // Adjusted token expiration
}

// JWT token validation middleware
const validateJwtToken = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(" ")[1];

    if (!token) {
        return res.status(401).json({ err: "Token not available" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach the decoded user data to the request object
        next();
    } catch (err) {
        return res.status(401).json({ err: "Invalid token" });
    }
};

module.exports = { generateJwtToken, validateJwtToken };
