// ============================================================
// routes/add.js - Add Hobby Route
// Handles GET /add (show form) and POST /add (submit form)
// ============================================================

import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

const dataPath = path.join(__dirname, '../data/hobbies.json');

// Helper function to read hobbies
function getHobbies() {
  const rawData = fs.readFileSync(dataPath, 'utf-8');
  return JSON.parse(rawData);
}

// Helper function to save hobbies back to the JSON file
function saveHobbies(hobbies) {
  fs.writeFileSync(dataPath, JSON.stringify(hobbies, null, 2), 'utf-8');
}

// GET /add - Display the Add Hobby form
router.get('/', (req, res) => {
  res.render('add', {
    title: 'Add a Hobby - Hobby Hub',
    success: null,
    error: null
  });
});

// POST /add - Handle form submission to add a new hobby
router.post('/', (req, res) => {
  const { title, description, category, difficulty, timeRequired, image } = req.body;

  // Basic validation - check required fields are filled
  if (!title || !description || !category) {
    return res.render('add', {
      title: 'Add a Hobby - Hobby Hub',
      success: null,
      error: 'Please fill in all required fields (Title, Description, Category).'
    });
  }

  // Read current hobbies from the data file
  const hobbies = getHobbies();

  // Create a new hobby object
  const newHobby = {
    id: hobbies.length + 1,
    title: title.trim(),
    description: description.trim(),
    category: category.trim(),
    image: image || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop',
    difficulty: difficulty || 'Beginner',
    timeRequired: timeRequired || 'Flexible',
    featured: false
  };

  hobbies.push(newHobby);
  saveHobbies(hobbies);

  res.render('add', {
    title: 'Add a Hobby - Hobby Hub',
    success: `"${newHobby.title}" has been added successfully!`,
    error: null
  });
});

export default router;
