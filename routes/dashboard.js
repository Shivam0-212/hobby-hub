// ============================================================
// routes/dashboard.js - Dashboard Route
// Displays hobby statistics and a summary of all hobbies
// ============================================================

import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Helper function to read hobbies from the JSON data file
function getHobbies() {
  const dataPath = path.join(__dirname, '../data/hobbies.json');
  const rawData = fs.readFileSync(dataPath, 'utf-8');
  return JSON.parse(rawData);
}

// GET /dashboard - Render the dashboard page with stats
router.get('/', (req, res) => {
  const hobbies = getHobbies();

  const totalHobbies = hobbies.length;

  // Count hobbies per category
  const categoryCounts = {};
  hobbies.forEach(hobby => {
    categoryCounts[hobby.category] = (categoryCounts[hobby.category] || 0) + 1;
  });

  // Count hobbies per difficulty level
  const difficultyCounts = {};
  hobbies.forEach(hobby => {
    difficultyCounts[hobby.difficulty] = (difficultyCounts[hobby.difficulty] || 0) + 1;
  });

  // Convert category counts to array
  const categoryStats = Object.entries(categoryCounts).map(([name, count]) => ({ name, count }));

  // Get the most popular category
  const popularCategory = categoryStats.sort((a, b) => b.count - a.count)[0];

  res.render('dashboard', {
    title: 'Dashboard - Hobby Hub',
    hobbies: hobbies,
    totalHobbies: totalHobbies,
    categoryStats: categoryStats,
    difficultyCounts: difficultyCounts,
    popularCategory: popularCategory
  });
});

export default router;
