const User = require('../models/User.model');

async function getLeaderboard() {
    try {
        const users = await User.find({}).sort({ points: -1 });
        return users.map(user => ({
            username: user.username,
            points: user.points,
        }));
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        throw error;
    }
}

module.exports = {
    getLeaderboard,
};