// routes/threats.js

const express = require('express');
const router = express.Router();
const Threat = require('../models/Threat');
const auth = require('../middleware/authMiddleware');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.get('/', async (req, res) => {
    try {
        const threats = await Threat.find().sort({ createdAt: -1 });
        res.json(threats);
    } catch (err) {
        res.status(500).json({ error: 'Server Error' });
    }
});

router.post('/', auth, async (req, res) => {
    try {
        const newThreat = new Threat(req.body);
        await newThreat.save();
        res.status(201).json(newThreat);
    } catch (err) {
        res.status(400).json({ error: 'Failed to create threat' });
    }
});

router.put('/:id', auth, async (req, res) => {
    try {
        const updated = await Threat.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!updated) return res.status(404).json({ error: 'Threat not found' });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: 'Failed to update threat' });
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        const deleted = await Threat.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: 'Threat not found' });
        res.json({ message: 'Threat deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete threat' });
    }
});

router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ error: "User already exists" });

        const newUser = new User({ username, email, password });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        console.error("Register error:", err);
        res.status(500).json({ error: "Registration failed" });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    console.log(" Login attempt with:", email, password);

    try {
        const user = await User.findOne({ email });
        console.log(" User found:", user);

        if (!user) return res.status(400).json({ error: "Invalid credentials (user not found)" });

        const isMatch = await bcrypt.compare(password, user.password);
        console.log("🔍 Password match:", isMatch);

        if (!isMatch) return res.status(400).json({ error: "Invalid credentials (wrong password)" });

        const token = jwt.sign({ userId: user._id }, process.env.REACT_APP_JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({ token });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ error: "Login failed" });
    }
});

module.exports = router;
