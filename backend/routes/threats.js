const express = require('express');
const router = express.Router();
const axios = require('axios');
const Threat = require('../models/Threat');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, async (req, res) => {
    const { ipAddress, domain, url, fileHash, threatLevel, category } = req.body;

    try {
        let inputToCheck = '';

        // 👇 Determine which field to send based on category
        switch (category) {
            case 'IP':
                inputToCheck = ipAddress;
                break;
            case 'Domain':
                inputToCheck = domain;
                break;
            case 'URL':
                inputToCheck = url;
                break;
            case 'FileHash':
                inputToCheck = fileHash;
                break;
            default:
                return res.status(400).json({ error: 'Invalid category' });
        }

        // 🔁 Call the Flask prediction API
        const flaskResponse = await axios.post('http://127.0.0.1:5000/predict', {
            input: inputToCheck
        });

        const { status } = flaskResponse.data;

        const newThreat = new Threat({
            ipAddress,
            domain,
            url,
            fileHash,
            threatLevel,
            category,
            isMalicious: status === 'malicious'
        });

        await newThreat.save();

        res.status(201).json(newThreat);
    } catch (err) {
        console.error('🚨 Threat creation error:', err.message);
        res.status(500).json({ error: 'Failed to create threat' });
    }
});

router.get("/", async (req, res) => {
    try {
        const threats = await Threat.find();
        res.json(threats);
    } catch (err) {
        res.status(500).json({ error: "Server error fetching threats." });
    }
});

module.exports = router;
