const express = require("express");
const router = express.Router();
const Threat = require("../models/Threat");
const authMiddleware = require("../middleware/authMiddleware");

// GET all threats (Public)
router.get("/", async (req, res) => {
    try {
        const threats = await Threat.find();
        res.json(threats);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

// POST a new threat (Protected)
router.post("/", authMiddleware, async (req, res) => {
    try {
        const newThreat = new Threat(req.body);
        await newThreat.save();
        res.status(201).json(newThreat);
    } catch (error) {
        res.status(400).json({ message: "Invalid Data" });
    }
});

module.exports = router;
