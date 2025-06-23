const express = require('express');

const leaderboardRouter = express.Router();
leaderboardRouter.use(express.json());

const leaderboardController = require('../controller/leaderboardController.js');

leaderboardRouter.get('/health', (req, res) => {
    res.json({"message": "leaderboard api healthy"});
});

leaderboardRouter.get('/', leaderboardController.handleGetLeaderboard);

module.exports = leaderboardRouter;