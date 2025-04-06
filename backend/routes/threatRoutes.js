// const express = require("express");
// const router = express.Router();
// const Threat = require("../models/Threat");
// const authMiddleware = require("../middleware/authMiddleware");

// // GET all threats (Public)
// router.get("/", async (req, res) => {
//     try {
//         const threats = await Threat.find();
//         res.json(threats);
//     } catch (error) {
//         res.status(500).json({ message: "Server Error" });
//     }
// });

// // POST a new threat (Protected)
// router.post("/", authMiddleware, async (req, res) => {
//     try {
//         const newThreat = new Threat(req.body);
//         await newThreat.save();
//         res.status(201).json(newThreat);
//     } catch (error) {
//         res.status(400).json({ message: "Invalid Data" });
//     }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const Threat = require("../models/Threat");
const authMiddleware = require("../middleware/authMiddleware");

// 🔓 Public route to get all threats
router.get("/", async (req, res) => {
    const threats = await Threat.find().sort({ createdAt: -1 });
    res.json(threats);
});

// 🔐 Protected - Add threat
router.post("/", authMiddleware, async (req, res) => {
    try {
        const threat = new Threat(req.body);
        await threat.save();
        res.status(201).json(threat);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 🔐 Protected - Edit threat
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const updated = await Threat.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 🔐 Protected - Delete threat
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        await Threat.findByIdAndDelete(req.params.id);
        res.json({ message: "Threat deleted" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
