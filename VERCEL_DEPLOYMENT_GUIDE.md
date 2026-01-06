# 🚀 Vercel Deployment Guide - Cyber Hunt Quiz

## 🎯 Why Vercel?

✅ **Full-Stack in One Place** - Frontend + Backend together  
✅ **Serverless Functions** - Auto-scaling backend  
✅ **Global CDN** - Fast worldwide performance  
✅ **Free Tier** - Generous limits for personal projects  
✅ **Easy Deployment** - Git integration  
✅ **Custom Domains** - Professional URLs  

## 📋 Pre-Deployment Setup

### ✅ Files Prepared for Vercel
- `vercel.json` - Vercel configuration
- `api/index.js` - Serverless function entry point
- `backend/server.js` - Updated for serverless
- `frontend/.env.production` - Production environment
- `frontend/package.json` - Vercel build script

## 🚀 Deployment Steps

### Step 1: Install Vercel CLI (Optional)
```bash
npm install -g vercel
```

### Step 2: Deploy via GitHub (Recommended)

1. **Push your code to GitHub** (if not already done):
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. **Go to Vercel Dashboard**:
   - Visit: https://vercel.com/
   - Sign up/Login with GitHub
   - Click "New Project"

3. **Import Repository**:
   - Select your `cyber-hunt-quiz` repository
   - Click "Import"

4. **Configure Project**:
   - **Project Name**: `cyber-hunt-quiz`
   - **Framework Preset**: Create React App
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `cd frontend && npm run build`
   - **Output Directory**: `frontend/build`
   - **Install Command**: `npm install`

### Step 3: Add Environment Variables

In Vercel dashboard, go to **Settings** → **Environment Variables** and add:

```
NODE_ENV=production
FIREBASE_PROJECT_ID=cyber-hunt-quiz-155b5
FIREBASE_PRIVATE_KEY=[Your Firebase Private Key - paste the full key]
FIREBASE_CLIENT_EMAIL=[Your Firebase Client Email]
```

**Important**: For `FIREBASE_PRIVATE_KEY`, paste the entire private key including the `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----` parts.

### Step 4: Deploy!

Click **"Deploy"** - Vercel will automatically:
- ✅ Install dependencies
- ✅ Build your React app
- ✅ Set up serverless functions
- ✅ Deploy to global CDN

## 🔗 Your Live URLs

After deployment, your app will be available at:

- **Main App**: `https://cyber-hunt-quiz.vercel.app`
- **API Health**: `https://cyber-hunt-quiz.vercel.app/api/health`
- **Manual Refresh**: `https://cyber-hunt-quiz.vercel.app/api/refresh`

## 🎯 Alternative: CLI Deployment

If you prefer using the CLI:

```bash
# Navigate to your project
cd C:\Users\Akhil\OneDrive\Desktop\ctf

# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts:
# ? Set up and deploy "~/ctf"? [Y/n] y
# ? Which scope do you want to deploy to? [Your Account]
# ? Link to existing project? [y/N] n
# ? What's your project's name? cyber-hunt-quiz
# ? In which directory is your code located? ./
```

## 🔧 Project Structure for Vercel

```
cyber-hunt-quiz/
├── vercel.json              # Vercel configuration
├── api/
│   └── index.js            # Serverless function entry
├── frontend/               # React app
│   ├── build/             # Built files (auto-generated)
│   ├── src/               # Source code
│   └── package.json       # Frontend dependencies
└── backend/               # Express server
    ├── server.js          # Main server (serverless-ready)
    ├── config/            # Configuration
    ├── routes/            # API routes
    └── utils/             # Utilities including auto-refresh
```

## 🔄 Auto-Refresh in Vercel

### How It Works in Serverless:
- **Manual Refresh**: `POST /api/refresh` endpoint
- **Cold Start Refresh**: First request initializes Firebase
- **Scheduled Refresh**: Can be set up with Vercel Cron Jobs

### Manual Refresh:
```bash
# Trigger refresh anytime
curl -X POST https://cyber-hunt-quiz.vercel.app/api/refresh
```

### Admin Panel Refresh:
- Press `Ctrl + Shift + A` on quiz start screen
- Use admin panel to clear and reload questions

## 🎯 Testing Your Deployment

### 1. Test Frontend
- Visit: `https://cyber-hunt-quiz.vercel.app`
- Quiz should load with 20 questions
- Timer should work (10 minutes)

### 2. Test Backend API
- Visit: `https://cyber-hunt-quiz.vercel.app/api/health`
- Should return JSON with success message

### 3. Test Full Flow
- Take a complete quiz
- Submit answers
- Check leaderboard for results
- Test admin panel (Ctrl+Shift+A)

## 🔧 Troubleshooting

### Common Issues:

1. **Build Fails**:
   - Check that `frontend/package.json` has `vercel-build` script
   - Verify all dependencies are listed

2. **API Not Working**:
   - Check environment variables in Vercel dashboard
   - Verify Firebase credentials are correct
   - Check function logs in Vercel dashboard

3. **CORS Errors**:
   - Ensure CORS is configured for Vercel domain
   - Check `backend/server.js` CORS settings

4. **Firebase Connection Issues**:
   - Verify all Firebase environment variables
   - Check Firebase project permissions
   - Test Firebase connection locally first

## 🚀 Production Optimizations

### Performance:
- ✅ **Global CDN** - Fast loading worldwide
- ✅ **Serverless Auto-scaling** - Handles traffic spikes
- ✅ **Edge Functions** - Reduced latency
- ✅ **Automatic HTTPS** - Secure connections

### Monitoring:
- **Vercel Analytics** - Built-in performance monitoring
- **Function Logs** - Debug serverless functions
- **Real-time Metrics** - Monitor usage and performance

## 🎉 Benefits of Vercel Deployment

### For Development:
- **Git Integration** - Auto-deploy on push
- **Preview Deployments** - Test branches automatically
- **Instant Rollbacks** - Quick recovery from issues

### For Production:
- **99.99% Uptime** - Reliable hosting
- **Global Performance** - Fast worldwide
- **Automatic Scaling** - Handles any traffic
- **Professional URLs** - Custom domains supported

## 📊 Vercel Free Tier Limits

- **Bandwidth**: 100GB/month
- **Function Executions**: 100GB-hours/month
- **Function Duration**: 10 seconds max
- **Build Time**: 6 hours/month
- **Team Members**: 1 (personal projects)

Perfect for your quiz competition! 🎯

## 🔄 Continuous Deployment

Once set up, every push to GitHub automatically:
1. **Triggers new deployment**
2. **Runs build process**
3. **Updates live site**
4. **Provides preview URL**

## 🎯 Custom Domain (Optional)

To use your own domain:
1. **Go to Vercel Dashboard** → Project Settings → Domains
2. **Add your domain** (e.g., `cyberhuntquiz.com`)
3. **Update DNS records** as instructed
4. **Automatic HTTPS** will be configured

---

## 🚀 Quick Start Summary

1. **Push code to GitHub**
2. **Connect repository to Vercel**
3. **Add Firebase environment variables**
4. **Deploy!**

Your Cyber Hunt Quiz will be live at `https://cyber-hunt-quiz.vercel.app` with:
- ✅ Full-stack application
- ✅ Auto-refresh system
- ✅ Global performance
- ✅ Professional deployment

**Perfect for competitions, portfolios, and sharing with the world!** 🌐✨