// ============================================================
// server.js - Main entry point for the Hobby Hub application
// Sets up Express, EJS, routes, and starts the server
// Uses ESM (import/export) syntax
// ============================================================

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// In ESM, __dirname is not available - we recreate it
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create Express application instance
const app = express();

// --------------------------------------------------------
// PORT CONFIGURATION
// Read the PORT from environment variable (required by Replit)
// Falls back to 3000 if not set
// --------------------------------------------------------
const PORT = process.env.PORT || 3000;

// --------------------------------------------------------
// TEMPLATE ENGINE SETUP
// Configure EJS as the view (template) engine
// Express will look for .ejs files in the "views" folder
// --------------------------------------------------------
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// --------------------------------------------------------
// MIDDLEWARE SETUP
// Middleware runs before route handlers
// --------------------------------------------------------

// Parse URL-encoded form data (for POST forms)
app.use(express.urlencoded({ extended: true }));

// Parse JSON request bodies
app.use(express.json());

// Serve static files (CSS, JS, images) from the "public" folder
// e.g. /style.css => public/style.css
app.use(express.static(path.join(__dirname, 'public')));

// --------------------------------------------------------
// ROUTE IMPORTS
// Import route modules from the "routes" folder
// --------------------------------------------------------
import indexRouter from './routes/index.js';
import exploreRouter from './routes/explore.js';
import addRouter from './routes/add.js';
import dashboardRouter from './routes/dashboard.js';
import aboutRouter from './routes/about.js';
import communityRouter from './routes/community.js';
import editRouter from './routes/edit.js';

// --------------------------------------------------------
// ROUTE MOUNTING
// Mount each router at its corresponding path
// --------------------------------------------------------
app.use('/', indexRouter);
app.use('/explore', exploreRouter);
app.use('/add', addRouter);
app.use('/dashboard', dashboardRouter);
app.use('/about', aboutRouter);
app.use('/community', communityRouter);
app.use('/edit', editRouter);

// --------------------------------------------------------
// 404 ERROR HANDLER
// If no route matched, send a simple 404 response
// --------------------------------------------------------
app.use((req, res) => {
  res.status(404).send('<h1>404 - Page Not Found</h1><p><a href="/">Go back to Home</a></p>');
});

// --------------------------------------------------------
// START THE SERVER
// Listen on the configured port
// --------------------------------------------------------
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Hobby Hub server is running on port ${PORT}`);
  console.log(`Visit: http://localhost:${PORT}`);
});

export default app;
