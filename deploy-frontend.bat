@echo off
echo 🚀 Deploying Frontend to GitHub Pages
echo =====================================
echo.

echo 📋 Step 1: Navigate to frontend directory...
cd frontend
if errorlevel 1 (
    echo ❌ Frontend directory not found
    pause
    exit /b 1
)

echo 📋 Step 2: Installing gh-pages package...
npm install gh-pages --save-dev
if errorlevel 1 (
    echo ❌ Failed to install gh-pages
    pause
    exit /b 1
)

echo 📋 Step 3: Building React application...
npm run build
if errorlevel 1 (
    echo ❌ Build failed
    pause
    exit /b 1
)

echo 📋 Step 4: Deploying to GitHub Pages...
npm run deploy
if errorlevel 1 (
    echo ❌ Deployment failed
    pause
    exit /b 1
)

echo.
echo 🎉 SUCCESS! Frontend deployed to GitHub Pages!
echo ✅ Your app will be available at:
echo    https://YOUR_USERNAME.github.io/cyber-hunt-quiz
echo.
echo ⏳ Note: It may take 1-2 minutes for the site to be live
echo.
pause