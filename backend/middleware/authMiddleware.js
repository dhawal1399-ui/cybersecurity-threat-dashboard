// const jwt = require("jsonwebtoken");

// module.exports = function (req, res, next) {
//     const authHeader = req.header("Authorization");

//     // Check if Authorization header is present
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//         return res.status(401).json({ message: "Access denied. No token provided." });
//     }

//     // Extract token from header
//     const token = authHeader.split(" ")[1];

//     try {
//         // Verify token using secret
//         const decoded = jwt.verify(token, process.env.REACT_APP_JWT_SECRET);
//         req.user = decoded; // Attach decoded user to request
//         next(); // Proceed to next middleware or route handler
//     } catch (error) {
//         console.error("Invalid Token Error:", error);
//         return res.status(401).json({ message: "Invalid token" });
//     }
// };

const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token)
        return res.status(401).json({ error: "Access denied. No token provided." });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        // Optional: load full user from DB
        const user = await User.findById(decoded.id);
        if (!user) return res.status(404).json({ error: "User not found" });

        req.user = user;
        next();
    } catch (err) {
        res.status(400).json({ error: "Invalid token." });
    }
};

module.exports = authMiddleware;
