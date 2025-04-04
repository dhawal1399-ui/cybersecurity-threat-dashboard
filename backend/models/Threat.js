const mongoose = require("mongoose");

const ThreatSchema = new mongoose.Schema({
    ipAddress: String,  // Stores IP address
    domain: String,  // Stores domain
    url: String,  // Stores URL
    fileHash: String,  // Stores file hash
    threatLevel: { type: String, enum: ["Low", "Medium", "High"], required: true },  // Threat severity
    category: { type: String, enum: ["IP", "domain", "URL", "file hash"], required: true },  // Type of threat
    isMalicious: Boolean  // Whether the threat is malicious
});

module.exports = mongoose.model("Threat", ThreatSchema);

