const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const isMaintenanceMode = false;

app.use((req, res, next) => {
  if (req.path.startsWith('/errors/')) {
    return next();
  }
  
  if (isMaintenanceMode) {
    return res.redirect('/errors/503.html');
  }
  next();
});

app.get('/', (req, res) => {
  res.send('<h1>Welcome to the Homepage</h1><p>Try visiting /admin, /profile, /bad-request, or /crash</p>');
});

app.get('/profile', (req, res) => {
  const isLoggedIn = false;
  if (!isLoggedIn) {
    return res.redirect('/errors/401.html');
  }
  res.send('<h1>User Profile</h1>');
});

app.get('/admin', (req, res) => {
  const isAdmin = false;
  if (!isAdmin) {
    return res.redirect('/errors/403.html');
  }
  res.send('<h1>Admin Dashboard</h1>');
});

app.get('/search', (req, res) => {
  if (!req.query.q) {
    return res.redirect('/errors/400.html');
  }
  res.send(`<h1>Search results for: ${req.query.q}</h1>`);
});

app.get('/crash', (req, res, next) => {
  try {
    throw new Error('Database connection failed!');
  } catch (err) {
    next(err);
  }
});

app.use((req, res, next) => {
  res.redirect('/errors/404.html');
});

app.use((err, req, res, next) => {
  console.error('Server Error:', err.stack);
  res.redirect('/errors/500.html');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
