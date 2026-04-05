import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const router     = express.Router();
const dataPath   = path.join(__dirname, '../data/hobbies.json');

function getHobbies()   { return JSON.parse(fs.readFileSync(dataPath, 'utf-8')); }
function saveHobbies(h) { fs.writeFileSync(dataPath, JSON.stringify(h, null, 2)); }

// GET /edit/:id - show pre-filled form
router.get('/:id', (req, res) => {
  const hobby = getHobbies().find(h => h.id === parseInt(req.params.id));
  if (!hobby) return res.redirect('/explore');
  res.render('edit', { title: 'Edit Hobby - Hobby Hub', hobby });
});

// POST /edit/:id - save changes
router.post('/:id', (req, res) => {
  const { title, description, category, difficulty, timeRequired, image } = req.body;
  const hobbies = getHobbies();
  const idx = hobbies.findIndex(h => h.id === parseInt(req.params.id));
  if (idx === -1) return res.redirect('/explore');
  hobbies[idx] = { ...hobbies[idx], title: title.trim(), description: description.trim(), category: category.trim(), difficulty, timeRequired, image: image || hobbies[idx].image };
  saveHobbies(hobbies);
  res.redirect('/explore');
});

export default router;