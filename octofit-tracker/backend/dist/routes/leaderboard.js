import { Router } from 'express';
import { Activity, User } from '../models/index.js';
export const leaderboardRouter = Router();
leaderboardRouter.get('/', async (_req, res, next) => {
    try {
        const leaderboard = await Activity.aggregate([
            { $group: { _id: '$userId', points: { $sum: '$points' }, activities: { $sum: 1 } } },
            { $sort: { points: -1 } },
            { $lookup: { from: User.collection.name, localField: '_id', foreignField: '_id', as: 'user' } },
            { $unwind: { path: '$user', preserveNullAndEmptyArrays: true } },
            { $project: { _id: 0, userId: '$_id', username: '$user.username', name: '$user.name', points: 1, activities: 1 } },
        ]);
        res.json(leaderboard);
    }
    catch (error) {
        next(error);
    }
});
