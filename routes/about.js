// ============================================================
// routes/about.js - About & Contact Route
// Renders the about page with information about Hobby Hub
// ============================================================

import express from 'express';

const router = express.Router();

// GET /about - Render the about page
router.get('/', (req, res) => {
  res.render('about', {
    title: 'About & Contact - Hobby Hub',
    teamMembers: [
      { name: 'Shivam Agrawal', role: 'Founder & Developer',  bio: 'Built Hobby Hub from scratch. Passionate about connecting people with hobbies.' },
      { name: 'Shivam Agrawal', role: 'Content Curator',      bio: 'Expert in finding and recommending hobbies for all skill levels.' },
      { name: 'Shivam Agrawal', role: 'Community Manager',    bio: 'Brings people together to share hobby experiences and inspire others.' }
      
    ]
  });
});

export default router;
