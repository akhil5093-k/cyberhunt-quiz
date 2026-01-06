@echo off
echo 🚀 Committing Cyber Hunt Quiz to GitHub
echo ========================================
echo.

echo 📋 Step 1: Checking Git status...
git status
if errorlevel 1 (
    echo ❌ Git repository not initialized
    echo 💡 Initializing Git repository...
    git init
    if errorlevel 1 (
        echo ❌ Failed to initialize Git
        pause
        exit /b 1
    )
)

echo.
echo 📋 Step 2: Adding all files to Git...
git add .
if errorlevel 1 (
    echo ❌ Failed to add files
    pause
    exit /b 1
)
echo ✅ All files added to Git

echo.
echo 📋 Step 3: Creating commit...
git commit -m "Complete Cyber Hunt Quiz with Auto-Refresh System and Vercel Deployment

✨ Features Added:
- Full-stack cybersecurity quiz application
- Auto-refresh system (clears data on server restart)
- 20 cybersecurity questions (15 Easy + 5 Medium)
- 10-minute timer with auto-submit
- Real-time leaderboard with rankings
- Admin panel for question management
- Responsive design for all devices

🚀 Deployment Ready:
- Vercel full-stack deployment configuration
- GitHub Pages deployment option
- Render deployment option
- Production environment setup
- Serverless function compatibility

🔧 Technical Stack:
- Frontend: React 18 + CSS3
- Backend: Node.js + Express
- Database: Firebase Firestore
- Deployment: Vercel serverless functions
- Auto-refresh: Custom utility system

🔒 Security:
- Environment variables for sensitive data
- Firebase security rules
- CORS configuration
- Input validation and sanitization

📚 Documentation:
- Complete setup guides
- Deployment instructions
- Troubleshooting guides
- API documentation
- Auto-refresh system guide

Ready for production deployment and competitions! 🎯"

if errorlevel 1 (
    echo ❌ Failed to create commit
    pause
    exit /b 1
)
echo ✅ Commit created successfully

echo.
echo 📋 Step 4: Checking for remote repository...
git remote -v
if errorlevel 1 (
    echo ⚠️ No remote repository configured
    echo.
    echo 🔧 To add remote repository:
    echo 1. Create a repository on GitHub named 'cyber-hunt-quiz'
    echo 2. Run: git remote add origin https://github.com/YOUR_USERNAME/cyber-hunt-quiz.git
    echo 3. Run: git push -u origin main
    echo.
    pause
    exit /b 0
)

echo.
echo 📋 Step 5: Pushing to GitHub...
git push
if errorlevel 1 (
    echo ⚠️ Push failed, trying to set upstream...
    git push -u origin main
    if errorlevel 1 (
        echo ❌ Failed to push to GitHub
        echo.
        echo 🔧 Troubleshooting:
        echo 1. Check your internet connection
        echo 2. Verify GitHub repository exists
        echo 3. Check your GitHub authentication
        echo 4. Make sure remote URL is correct
        pause
        exit /b 1
    )
)

echo.
echo 🎉 SUCCESS! Code committed and pushed to GitHub!
echo ✅ Your Cyber Hunt Quiz is now on GitHub
echo.
echo 📋 What's been committed:
echo ✅ Complete source code (frontend + backend)
echo ✅ Auto-refresh system implementation
echo ✅ Vercel deployment configuration
echo ✅ Comprehensive documentation
echo ✅ Security best practices (.env files protected)
echo ✅ Production-ready setup
echo.
echo 🔗 Next Steps:
echo 1. Visit your GitHub repository to verify upload
echo 2. Deploy to Vercel using the repository
echo 3. Add Firebase environment variables in Vercel
echo 4. Test your live application
echo.
pause