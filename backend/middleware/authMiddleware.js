const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    const token = req.header("Authorization");  // Get token from header

    if (!token) return res.status(401).json({ message: "Access denied" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Verify token
        req.user = decoded;  // Attach user info to request
        next();  // Proceed to the next function
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};
