const express = require('express')

const eventsRouter = express.Router()
eventsRouter.use(express.json())

eventsRouter.get('/health', (req, res) => {
    res.json({"message":"events api healthy"})
})


module.exports = eventsRouter
