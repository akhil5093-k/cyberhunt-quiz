const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const quizRoutes = require('./routes/quiz');
const errorHandler = require('./middleware/errorHandler');
const { autoRefreshData } = require('./utils/autoRefresh');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Firebase (auto-refresh handled differently in serverless)
let isInitialized = false;

const initializeApp = async () => {
  if (isInitialized) return;
  
  try {
    console.log('🔥 Initializing Firebase...');
    await connectDB();
    console.log('✅ Firebase connected successfully');
    
    // For Vercel, we'll handle auto-refresh via API calls instead of server startup
    if (process.env.VERCEL !== '1') {
      console.log('🔄 Starting auto-refresh...');
      await autoRefreshData();
      console.log('✅ Auto-refresh completed successfully');
    }
    
    isInitialized = true;
  } catch (error) {
    console.error('⚠️ Initialization failed:', error.message);
    console.error('⚠️ Server will continue but data may not be refreshed...');
  }
};

// Initialize on first request (for serverless)
app.use(async (req, res, next) => {
  await initializeApp();
  next();
});

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://cyber-hunt-quiz.vercel.app', 'https://your-custom-domain.com']
    : 'http://localhost:3000',
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/quiz', quizRoutes);

// Auto-refresh endpoint (for manual refresh if needed)
app.post('/api/refresh', async (req, res) => {
  try {
    console.log('🔄 Manual refresh triggered...');
    const { autoRefreshData } = require('./utils/autoRefresh');
    const result = await autoRefreshData();
    res.json({
      success: true,
      message: 'Data refreshed successfully',
      data: result
    });
  } catch (error) {
    console.error('❌ Manual refresh failed:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to refresh data',
      error: error.message
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Cyber Hunt Quiz API running on Vercel!',
    timestamp: new Date().toISOString(),
    platform: 'Vercel Serverless',
    features: [
      'Serverless auto-scaling',
      'Manual refresh available',
      'Firebase Firestore integration'
    ]
  });
});

// Error handling middleware
app.use(errorHandler);

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found'
  });
});

// For local development
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Quiz Competition Server running on port ${PORT}`);
    console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔗 API Base URL: http://localhost:${PORT}/api`);
    console.log(`🔥 Database: Firebase Firestore`);
  });
}

// Export for Vercel
module.exports = app;