const mongoose = require("mongoose");

const ThreatSchema = new mongoose.Schema({
    ipAddress: String,
    domain: String,
    url: String,
    fileHash: String,
    threatLevel: {
        type: String,
        enum: ["Low", "Medium", "High"], // ✅ Capitalized
        required: true
    },
    category: {
        type: String,
        enum: ["IP", "Domain", "URL", "FileHash"], // ✅ Capitalized and consistent
        required: true
    },
    isMalicious: Boolean
});

module.exports = mongoose.model("Threat", ThreatSchema);
