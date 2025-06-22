const express = require('express')
const eventsController = require('./controller/eventsController')
const { handleCreate } = require('./controller/eventsController.js')
const { authorize } = require('./middleware/authorize.js')
const { events } = require('../models/User.model.js')

const eventsRouter = express.Router()
eventsRouter.use(express.json())

eventsRouter.post('/create', authorize('officer', 'executive'), eventsController.handleCreate)
eventsRouter.get('/:eventId', eventsController.handleGetById)
eventsRouter.get('/all', authorize('officer', 'executive'), eventsController.handleGetAll)
eventsRouter.get('/active', eventsController.handleGetActive)
eventsRouter.get('/non-active', authorize('officer', 'executive'), eventsController.handleGetNonActive)
eventsRouter.delete('/:eventId', authorize('officer', 'executive'), eventsController.handleDeletebyEventId)
eventsRouter.put('/:eventId', authorize('officer', 'executive'), eventsController.handleUpdateByEventId)


eventsRouter.get('/health', (req, res) => {
    res.json({"message":"events api healthy"})
})


module.exports = eventsRouter
