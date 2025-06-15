const express = require('express');
const path = require('path')
const dotenv = require('dotenv')

const userRouter = require('./api/users.js')
const eventsRouter = require('./api/events.js');

const PORT = 1525

const app = express();
app.use(express.json());

app.use('/api/users', userRouter)
app.use('/api/events',eventsRouter)

app.get('/health', (req, res) => {
    res.json({'message': 'server running'})
})

app.listen(PORT, () => {
    console.log(`Server running on PORT:${PORT}`)
})