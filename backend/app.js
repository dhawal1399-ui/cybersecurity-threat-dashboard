// app.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(express.json());

// DB Connect
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.error("❌ MongoDB Connection Error:", err));

// Routes
app.use("/api/threats", require("./routes/threatRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));

const threatsRoute = require('./routes/threats');
app.use('/api/threats', threatsRoute);

const authRoutes = require('./routes/auth');
app.use('/api', authRoutes);


module.exports = app;
