// ============================================================
// routes/explore.js - Explore Hobbies Route
// Handles GET /explore to display all hobbies with filtering
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

// GET /explore - Render the explore page with all hobbies
router.get('/', (req, res) => {
  let hobbies = getHobbies();

  // Get the category filter from query string (e.g. /explore?category=Music)
  const selectedCategory = req.query.category || 'All';

  // Extract unique categories for the filter buttons
  const categories = ['All', ...new Set(hobbies.map(h => h.category))];

  // If a category is selected, filter hobbies by that category
  if (selectedCategory !== 'All') {
    hobbies = hobbies.filter(h => h.category === selectedCategory);
  }

  // Render the explore.ejs view
  res.render('explore', {
    title: 'Explore Hobbies - Hobby Hub',
    hobbies: hobbies,
    categories: categories,
    selectedCategory: selectedCategory
  });
});

export default router;
