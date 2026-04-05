import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const router     = express.Router();

const postsPath  = path.join(__dirname, '../data/posts.json');
const eventsPath = path.join(__dirname, '../data/events.json');

function readJSON(p)    { return JSON.parse(fs.readFileSync(p, 'utf-8')); }
function writeJSON(p,d) { fs.writeFileSync(p, JSON.stringify(d, null, 2)); }

// GET /community
router.get('/', (req, res) => {
  res.render('community', {
    title: 'Community - Hobby Hub',
    posts:   readJSON(postsPath),
    events:  readJSON(eventsPath),
    success: req.query.success || null
  });
});

// POST /community/post
router.post('/post', (req, res) => {
  const { postTitle, postBody } = req.body;
  if (!postTitle || !postBody) return res.redirect('/community');
  const posts = readJSON(postsPath);
  posts.unshift({ id: Date.now(), title: postTitle.trim(), body: postBody.trim(), date: new Date().toLocaleDateString('en-IN') });
  writeJSON(postsPath, posts);
  res.redirect('/community?success=post');
});

// POST /community/event
router.post('/event', (req, res) => {
  const { eventName, eventDate, eventHobby } = req.body;
  if (!eventName || !eventDate) return res.redirect('/community');
  const events = readJSON(eventsPath);
  events.unshift({ id: Date.now(), name: eventName.trim(), date: eventDate, hobby: eventHobby || 'General', joined: 0 });
  writeJSON(eventsPath, events);
  res.redirect('/community?success=event');
});

// POST /community/join/:id
router.post('/join/:id', (req, res) => {
  const events = readJSON(eventsPath);
  const ev = events.find(e => e.id === parseInt(req.params.id));
  if (ev) ev.joined = (ev.joined || 0) + 1;
  writeJSON(eventsPath, events);
  res.redirect('/community');
});

export default router;