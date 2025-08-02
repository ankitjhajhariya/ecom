const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;

module.exports = function (req, res, next) {
    // Ensure the Authorization header exists and is in proper format
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "No token provided or invalid format" });
    }

    const token = authHeader.split(" ")[1]; // Get actual token after "Bearer"

    try {
        const decoded = jwt.verify(token, SECRET); // Decode JWT using your secret
        req.user = decoded; // Attach decoded user info to the request
        next(); // Move to next middleware or controller
    } catch (err) {
        return res.status(401).json({ error: "Invalid or expired token" });
    }
};
