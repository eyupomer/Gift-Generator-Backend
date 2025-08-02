require('module-alias/register');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
// Routes
const authRoutes = require('@/routes/auth')
const newsletterRoutes = require('@/routes/newsletter')

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/newsletter', newsletterRoutes)

// Test route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Gift Generator API is running!',
    status: 'success',
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
}); 