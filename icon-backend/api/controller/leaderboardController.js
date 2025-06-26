const leaderboardDAL = require('../../dal/leaderboardDAL');

async function handleGetLeaderboard(req, res) {
    try {
        const leaderboard = await leaderboardDAL.getLeaderboard();
        res.json(leaderboard);
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        res.status(500).json({ error: 'Failed to fetch leaderboard' });
    }
}

module.exports = {
    handleGetLeaderboard,
};