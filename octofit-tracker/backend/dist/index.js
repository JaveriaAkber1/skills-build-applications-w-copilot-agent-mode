import express from 'express';
import dotenv from 'dotenv';
import './config/database.js';
dotenv.config();
const app = express();
const PORT = Number(process.env.PORT) || 8000;
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', message: 'Octofit Tracker API is running' });
});
app.listen(PORT, () => {
    console.log('Octofit Tracker API listening on port ' + PORT);
});
