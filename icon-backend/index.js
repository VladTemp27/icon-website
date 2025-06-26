const express = require('express');
const path = require('path')
const dotenv = require('dotenv')
<<<<<<< HEAD
const cors = require('cors')
=======
>>>>>>> origin/main

const envPath = path.join(__dirname, './.env')
dotenv.config({path : envPath})

const { 
        connectToDatabase,
        disconnectFromDatabase 
    } = require('./dal/db.js')

const { authenticate } = require('./api/middleware/authorize.js')


const userRouter = require('./api/routes/users.js')
const eventsRouter = require('./api/routes/events.js');
const authRouter = require('./api/routes/auth.js')
<<<<<<< HEAD
const leaderboardRouter = require('./api/routes/leaderboard.js')
=======
>>>>>>> origin/main

connectToDatabase()
    .then(() => console.log('Database connected successfully'))
    .catch(err => console.error('Database connection failed:', err));
const PORT = 1525

const app = express();
<<<<<<< HEAD

app.use(cors({
    origin: process.env.CORS_ORIGIN || '*', // Allow all origins by default, can be overridden by environment variable
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

=======
>>>>>>> origin/main
app.use(express.json());

app.use('/api/users', authenticate, userRouter)
app.use('/api/events', authenticate, eventsRouter)
app.use('/api/auth', authRouter)
<<<<<<< HEAD
app.use('/api/leaderboard', authenticate, leaderboardRouter)
=======
>>>>>>> origin/main

app.get('/health', (req, res) => {
    res.json({'message': 'server running'})
})

app.listen(PORT, () => {

    console.log(`Server running on PORT:${PORT}`)
})