#!/bin/bash

echo "🚀 PPF Calculator Deployment Script"
echo "=================================="
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git repository not found. Initializing..."
    git init
    git add .
    git commit -m "Initial commit: PPF Pricing Calculator"
fi

echo "📋 Available deployment options:"
echo ""
echo "1. GitHub Pages (Free)"
echo "2. Netlify (Free)"
echo "3. Vercel (Free)"
echo "4. Traditional Web Hosting"
echo "5. Local Testing"
echo ""

read -p "Choose deployment option (1-5): " choice

case $choice in
    1)
        echo ""
        echo "🌐 GitHub Pages Deployment"
        echo "=========================="
        echo ""
        echo "1. Create a new repository on GitHub"
        echo "2. Run these commands:"
        echo ""
        echo "   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git"
        echo "   git branch -M main"
        echo "   git push -u origin main"
        echo ""
        echo "3. Go to repository Settings > Pages"
        echo "4. Select 'Deploy from a branch' and choose 'main'"
        echo "5. Your calculator will be available at: https://YOUR_USERNAME.github.io/YOUR_REPO_NAME"
        echo ""
        echo "✅ Ready to push to GitHub!"
        ;;
    2)
        echo ""
        echo "⚡ Netlify Deployment"
        echo "====================="
        echo ""
        echo "1. Go to https://netlify.com"
        echo "2. Drag and drop the 'index.html' file"
        echo "3. Get instant HTTPS and custom domain"
        echo "4. Optional: Connect to Git for auto-deployments"
        echo ""
        echo "✅ Ready to deploy to Netlify!"
        ;;
    3)
        echo ""
        echo "🚀 Vercel Deployment"
        echo "===================="
        echo ""
        echo "1. Go to https://vercel.com"
        echo "2. Connect your GitHub account"
        echo "3. Import your repository"
        echo "4. Deploy automatically on every push"
        echo ""
        echo "✅ Ready to deploy to Vercel!"
        ;;
    4)
        echo ""
        echo "🌍 Traditional Web Hosting"
        echo "=========================="
        echo ""
        echo "1. Upload 'index.html' to your web hosting service"
        echo "2. Works with shared hosting, VPS, or dedicated servers"
        echo "3. No build process required"
        echo "4. Access via your domain name"
        echo ""
        echo "✅ Ready to upload to web hosting!"
        ;;
    5)
        echo ""
        echo "🧪 Local Testing"
        echo "================"
        echo ""
        echo "Starting local server..."
        echo "Calculator will be available at: http://localhost:8000"
        echo "Press Ctrl+C to stop the server"
        echo ""
        python3 -m http.server 8000
        ;;
    *)
        echo "❌ Invalid option. Please choose 1-5."
        exit 1
        ;;
esac

echo ""
echo "📁 Files ready for deployment:"
echo "   - index.html (main application)"
echo "   - README.md (documentation)"
echo ""

if [ "$choice" != "5" ]; then
    echo "💡 Pro tip: Test locally first with option 5!"
fi
