const express = require('express');
const router = express.Router();

// Import route files
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const bandRoutes = require('./bandRoutes');
const rehearsalRoutes = require('./rehearsalRoutes');
const availabilityRoutes = require('./availabilityRoutes');
const calendarRoutes = require('./calendarRoutes');

// Mount routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/bands', bandRoutes);
router.use('/rehearsals', rehearsalRoutes);
router.use('/availability', availabilityRoutes);
router.use('/calendar', calendarRoutes);

module.exports = router;
