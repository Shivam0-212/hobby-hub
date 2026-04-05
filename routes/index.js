// ============================================================
// routes/index.js - Home Page Route
// Handles GET / to display the homepage
// ============================================================

import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ESM equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Helper function to read hobbies from the JSON data file
function getHobbies() {
  const dataPath = path.join(__dirname, '../data/hobbies.json');
  const rawData = fs.readFileSync(dataPath, 'utf-8');
  return JSON.parse(rawData);
}

// GET / - Render the home page
router.get('/', (req, res) => {
  const hobbies = getHobbies();

  // Filter only featured hobbies for the homepage section
  const featuredHobbies = hobbies.filter(hobby => hobby.featured);

  // Render the index.ejs view and pass data to it
  res.render('index', {
    title: 'Hobby Hub - Discover Your Passion',
    featuredHobbies: featuredHobbies,
    totalHobbies: hobbies.length
  });
});

export default router;
