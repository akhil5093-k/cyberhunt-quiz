# 🚀 Complete Deployment Guide - Cyber Hunt Quiz

## 📋 Deployment Strategy

**Frontend**: GitHub Pages (Free)  
**Backend**: Render (Free tier)  
**Database**: Firebase Firestore (Free tier)  

## 🎯 PART A: Deploy Frontend to GitHub Pages

### Step 1: Prepare Frontend
```bash
cd frontend
npm install gh-pages --save-dev
```

### Step 2: Update package.json
✅ **Already done!** Your `frontend/package.json` now includes:
- `homepage` field for GitHub Pages
- `predeploy` and `deploy` scripts
- `gh-pages` dependency

### Step 3: Deploy Frontend
```bash
# Option 1: Use the script
double-click deploy-frontend.bat

# Option 2: Manual commands
cd frontend
npm run deploy
```

### Step 4: Enable GitHub Pages
1. Go to your GitHub repository
2. Settings → Pages
3. Source: Deploy from a branch
4. Branch: `gh-pages`
5. Folder: `/ (root)`
6. Save

**Your frontend will be live at**: `https://YOUR_USERNAME.github.io/cyber-hunt-quiz`

## 🎯 PART B: Deploy Backend to Render

### Step 1: Prepare Backend
✅ **Already done!** Your backend includes:
- `render.yaml` configuration
- Updated `package.json` with engines
- Production-ready server setup

### Step 2: Deploy to Render
1. **Go to**: https://render.com/
2. **Sign up/Login** with GitHub
3. **Click "New +"** → Web Service
4. **Connect your repository**: `cyber-hunt-quiz`
5. **Configure deployment**:
   - **Name**: `cyber-hunt-quiz-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

### Step 3: Add Environment Variables in Render
In Render dashboard, go to Environment tab and add:

```
NODE_ENV=production
PORT=10000
FIREBASE_PROJECT_ID=cyber-hunt-quiz-155b5
FIREBASE_PRIVATE_KEY=[Your Firebase Private Key]
FIREBASE_CLIENT_EMAIL=[Your Firebase Client Email]
```

### Step 4: Deploy
Click "Create Web Service" - Render will automatically deploy!

**Your backend will be live at**: `https://your-app-name.onrender.com`

## 🎯 PART C: Connect Frontend to Backend

### Step 1: Update Frontend Environment
1. **Edit** `frontend/.env.production`
2. **Replace** `https://your-backend-app.onrender.com` with your actual Render URL
3. **Redeploy frontend**:
   ```bash
   cd frontend
   npm run deploy
   ```

### Step 2: Update Backend CORS
Your backend already includes CORS configuration for production.

## 🔧 Configuration Files Created

### ✅ Frontend Files
- `frontend/package.json` - Updated with GitHub Pages config
- `frontend/.env.production` - Production environment variables
- `deploy-frontend.bat` - Automated deployment script

### ✅ Backend Files
- `backend/render.yaml` - Render deployment configuration
- `backend/package.json` - Updated with engines and metadata

## 🚀 Quick Deployment Commands

### Deploy Frontend
```bash
# Navigate to project root
cd C:\Users\Akhil\OneDrive\Desktop\ctf

# Deploy frontend
cd frontend
npm run deploy
```

### Deploy Backend
1. Push code to GitHub
2. Connect repository to Render
3. Add environment variables
4. Deploy automatically

## 🔗 Final URLs

After deployment, your application will be available at:

- **Frontend**: `https://YOUR_USERNAME.github.io/cyber-hunt-quiz`
- **Backend**: `https://your-app-name.onrender.com`
- **API Health**: `https://your-app-name.onrender.com/api/health`

## 🎯 Testing Deployment

### Test Frontend
1. Visit your GitHub Pages URL
2. Check if the quiz loads
3. Verify Firebase connection works

### Test Backend
1. Visit `https://your-app-name.onrender.com/api/health`
2. Should return JSON with success message
3. Test auto-refresh: `https://your-app-name.onrender.com/api/refresh`

### Test Full Application
1. Take a quiz on the deployed frontend
2. Check if results appear on leaderboard
3. Verify auto-refresh works on backend restart

## 🔄 Auto-Refresh in Production

The auto-refresh system works in production:
- **Render restarts** → Auto-refresh triggers
- **Manual refresh** → `POST /api/refresh`
- **Scheduled restarts** → Fresh competitions

## 🔒 Security in Production

✅ **Environment variables** secure in Render  
✅ **Firebase credentials** not exposed  
✅ **CORS** properly configured  
✅ **HTTPS** enabled by default  

## 🚨 Important Notes

1. **Free tier limitations**:
   - Render: Apps sleep after 15 minutes of inactivity
   - GitHub Pages: 100GB bandwidth/month
   - Firebase: 50K reads/day, 20K writes/day

2. **First load may be slow** (Render cold start)

3. **Update frontend URL** in `.env.production` after backend deployment

## 🎉 Congratulations!

Your Cyber Hunt Quiz is now **live on the internet**! 🌐

- ✅ Professional deployment
- ✅ Auto-refresh system working
- ✅ Scalable architecture
- ✅ Free hosting solution
- ✅ Production-ready application

Perfect for competitions, portfolios, and sharing with others! 🚀✨