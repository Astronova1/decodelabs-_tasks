require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// DB Conntection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Successfully connected to MongoDB Database!'))
.catch((err) => console.error('Database connection failed:', err));

app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Project 2: Database Integration is LIVE!');
});

app.listen(PORT, () => {
    console.log(` Server is running on http://localhost:${PORT}`);
});