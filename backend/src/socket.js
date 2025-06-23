const logger = require('./utils/logger');
const jwt = require('jsonwebtoken');
const User = require('./models/userModel');

// Setup Socket.IO handlers
const setupSocketHandlers = (io) => {
  // Middleware for Socket.IO authentication
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      
      if (!token) {
        return next(new Error('Authentication error: Token not provided'));
      }
      
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Find user from token
      const user = await User.findById(decoded.id).select('-password');
      
      if (!user) {
        return next(new Error('Authentication error: User not found'));
      }
      
      // Attach user to socket
      socket.user = user;
      next();
    } catch (error) {
      logger.error(`Socket authentication error: ${error.message}`);
      next(new Error('Authentication error: Invalid token'));
    }
  });

  io.on('connection', (socket) => {
    logger.info(`User connected: ${socket.user._id}`);
    
    // Join user to personal room for direct messages
    socket.join(`user:${socket.user._id}`);
    
    // Handle joining band rooms for band-specific updates
    socket.on('joinBand', (bandId) => {
      socket.join(`band:${bandId}`);
      logger.info(`User ${socket.user._id} joined band room: ${bandId}`);
    });
    
    // Handle leaving band rooms
    socket.on('leaveBand', (bandId) => {
      socket.leave(`band:${bandId}`);
      logger.info(`User ${socket.user._id} left band room: ${bandId}`);
    });
    
    // Handle rehearsal updates (attendance, etc.)
    socket.on('rehearsalUpdate', (data) => {
      // Broadcast to all band members
      io.to(`band:${data.bandId}`).emit('rehearsalUpdated', data);
      logger.info(`Rehearsal update broadcast to band: ${data.bandId}`);
    });
    
    // Handle disconnection
    socket.on('disconnect', () => {
      logger.info(`User disconnected: ${socket.user._id}`);
    });
  });
};

module.exports = { setupSocketHandlers };
