const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/qtime';
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});

// Import routes (to be created)
const adminRoutes = require('./routes/admin');
const examRoutes = require('./routes/exam');
const questionRoutes = require('./routes/question');
const studentRoutes = require('./routes/student');
const leaderboardRoutes = require('./routes/leaderboard');
const userRoutes = require('./routes/user');

// Use routes
app.use('/api/admin', adminRoutes);
app.use('/api/exams', examRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/users', userRoutes);

// Basic route
app.get('/', (req, res) => {
    res.send('QTime Backend Running');
});

// Socket.io events placeholder
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
    // TODO: Add socket event handlers here
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});