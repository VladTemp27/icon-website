const express = require('express')

const apiRouter = express.Router()
apiRouter.use(express.json())

apiRouter.get('/health', (req, res) => {
    res.json({"message":"events api healthy"})
})


module.exports = apiRouter
