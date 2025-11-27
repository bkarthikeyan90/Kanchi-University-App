#!/bin/bash

echo "🚀 Kanchi University App - Deployment Script"
echo "=============================================="
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "⚠️  Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Check if logged in to Vercel
if ! vercel whoami &> /dev/null; then
    echo "⚠️  Not logged in to Vercel. Please login:"
    vercel login
fi

echo "📦 Deploying Backend to Vercel..."
cd backend

# Deploy to Vercel
vercel --prod

echo ""
echo "✅ Backend deployment initiated!"
echo ""
echo "📝 Next Steps:"
echo "1. Add environment variables in Vercel dashboard"
echo "2. Run database migrations: npx prisma db push"
echo "3. Create admin user: node scripts/create-admin.js"
echo ""
echo "📱 For mobile app deployment, run:"
echo "cd mobile && eas build --platform android"

