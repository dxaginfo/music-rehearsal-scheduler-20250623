const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

// Protect routes - middleware to check if user is authenticated
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check if token exists in Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find user from token payload and attach to request
      // Don't include password in the returned user object
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        res.status(401);
        throw new Error('Not authorized, user not found');
      }

      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token provided');
  }
});

// Middleware to check if user is an admin of a band
const bandAdmin = asyncHandler(async (req, res, next) => {
  const bandId = req.params.bandId;
  const user = req.user;

  // Find the band and check if user is admin
  const band = await Band.findById(bandId);

  if (!band) {
    res.status(404);
    throw new Error('Band not found');
  }

  // Check if user is an admin of the band
  const isAdmin = band.members.some(
    (member) => 
      member.userId.toString() === user._id.toString() && 
      member.role === 'admin'
  );

  if (!isAdmin) {
    res.status(403);
    throw new Error('Not authorized, only band admins can perform this action');
  }

  next();
});

module.exports = { protect, bandAdmin };
