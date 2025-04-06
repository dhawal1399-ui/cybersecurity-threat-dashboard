const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const threatRoutes = require('./routes/threats');

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/threats', threatRoutes);


// ✅ Error Handling for unknown routes
app.use((req, res, next) => {
    res.status(404).json({ error: "Not Found" });
});

// ✅ Server Start
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
