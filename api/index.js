// Vercel serverless function entry point
// This file makes the backend work as Vercel serverless functions

const app = require('../backend/server');

// Export the Express app as a Vercel serverless function
module.exports = app;