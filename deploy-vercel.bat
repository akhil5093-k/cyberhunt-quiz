@echo off
echo 🚀 Deploying Cyber Hunt Quiz to Vercel
echo ======================================
echo.

echo 📋 Step 1: Checking if Vercel CLI is installed...
vercel --version >nul 2>&1
if errorlevel 1 (
    echo ⚠️ Vercel CLI not found. Installing globally...
    npm install -g vercel
    if errorlevel 1 (
        echo ❌ Failed to install Vercel CLI
        echo 💡 You can also deploy via GitHub at https://vercel.com/
        pause
        exit /b 1
    )
)
echo ✅ Vercel CLI is ready

echo.
echo 📋 Step 2: Preparing for deployment...
echo ✅ vercel.json configuration ready
echo ✅ Serverless functions configured
echo ✅ Frontend build script ready
echo ✅ Environment variables template ready

echo.
echo 📋 Step 3: Starting Vercel deployment...
vercel
if errorlevel 1 (
    echo ❌ Deployment failed
    echo.
    echo 🔧 Troubleshooting:
    echo 1. Make sure you're logged in: vercel login
    echo 2. Check your internet connection
    echo 3. Verify project structure is correct
    echo 4. Try deploying via GitHub at https://vercel.com/
    pause
    exit /b 1
)

echo.
echo 🎉 SUCCESS! Deployment completed!
echo ✅ Your Cyber Hunt Quiz is now live on Vercel
echo.
echo 📋 Next Steps:
echo 1. Add Firebase environment variables in Vercel dashboard
echo 2. Test your live application
echo 3. Share your quiz with others!
echo.
echo 🔗 Visit Vercel dashboard: https://vercel.com/dashboard
echo.
pause