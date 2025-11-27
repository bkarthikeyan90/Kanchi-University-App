# PowerShell Deployment Script for Kanchi University App

Write-Host "🚀 Kanchi University App - Deployment Script" -ForegroundColor Cyan
Write-Host "==============================================" -ForegroundColor Cyan
Write-Host ""

# Check if Vercel CLI is installed
if (-not (Get-Command vercel -ErrorAction SilentlyContinue)) {
    Write-Host "⚠️  Vercel CLI not found. Installing..." -ForegroundColor Yellow
    npm install -g vercel
}

# Check if logged in to Vercel
try {
    vercel whoami | Out-Null
} catch {
    Write-Host "⚠️  Not logged in to Vercel. Please login:" -ForegroundColor Yellow
    vercel login
}

Write-Host "📦 Deploying Backend to Vercel..." -ForegroundColor Green
Set-Location backend

# Deploy to Vercel
vercel --prod

Write-Host ""
Write-Host "✅ Backend deployment initiated!" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Next Steps:" -ForegroundColor Yellow
Write-Host "1. Add environment variables in Vercel dashboard"
Write-Host "2. Run database migrations: npx prisma db push"
Write-Host "3. Create admin user: node scripts/create-admin.js"
Write-Host ""
Write-Host "📱 For mobile app deployment, run:" -ForegroundColor Cyan
Write-Host "cd mobile && eas build --platform android"

