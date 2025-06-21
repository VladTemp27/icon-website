const express = require('express');
const path = require('path')
const dotenv = require('dotenv')

const envPath = path.join(__dirname, './.env')
dotenv.config({path : envPath})

const { connectToDatabase,
    disconnectFromDatabase } = require('./dal/db.js')

const userRouter = require('./api/users.js')
const eventsRouter = require('./api/events.js');
const authRouter = require('./api/auth.js')

connectToDatabase()
    .then(() => console.log('Database connected successfully'))
    .catch(err => console.error('Database connection failed:', err));
const PORT = 1525

const app = express();
app.use(express.json());

app.use('/api/users', userRouter)
app.use('/api/events',eventsRouter)
app.use('/api/auth', authRouter)

app.get('/health', (req, res) => {
    res.json({'message': 'server running'})
})

app.listen(PORT, () => {

    console.log(`Server running on PORT:${PORT}`)
})