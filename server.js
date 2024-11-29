// server.js
const express = require('express');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
const cors = require("cors");
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

connectDB();

const app = express();

const corsOptions = {
    origin:"*",
    methods : "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials : true,
}
app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Hello, world..!' });
});

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.listen(process.env.PORT || 5000, () => console.log('Server running'));
