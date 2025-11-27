# PowerShell Script to Deploy Kanchi University App
# Run this script after Git is installed

Write-Host "🚀 Kanchi University App - Deployment Script" -ForegroundColor Cyan
Write-Host "==============================================" -ForegroundColor Cyan
Write-Host ""

# Check if Git is installed
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Git is not installed!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install Git first:" -ForegroundColor Yellow
    Write-Host "1. Download from: https://git-scm.com/download/win" -ForegroundColor Yellow
    Write-Host "2. Install with default settings" -ForegroundColor Yellow
    Write-Host "3. Restart PowerShell" -ForegroundColor Yellow
    Write-Host "4. Run this script again" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Git is installed" -ForegroundColor Green
Write-Host ""

# Check Git configuration
$gitName = git config --global user.name 2>$null
$gitEmail = git config --global user.email 2>$null

if (-not $gitName -or -not $gitEmail) {
    Write-Host "⚠️  Git is not configured" -ForegroundColor Yellow
    Write-Host ""
    $name = Read-Host "Enter your name (for Git commits)"
    $email = Read-Host "Enter your email (for Git commits)"
    
    git config --global user.name "$name"
    git config --global user.email "$email"
    Write-Host "✅ Git configured" -ForegroundColor Green
    Write-Host ""
}

# Check if already a git repository
if (Test-Path .git) {
    Write-Host "ℹ️  Git repository already initialized" -ForegroundColor Blue
} else {
    Write-Host "📦 Initializing Git repository..." -ForegroundColor Cyan
    git init
    Write-Host "✅ Git repository initialized" -ForegroundColor Green
}

# Check if .gitignore exists
if (-not (Test-Path .gitignore)) {
    Write-Host "⚠️  .gitignore not found" -ForegroundColor Yellow
}

# Add all files
Write-Host ""
Write-Host "📝 Adding files to Git..." -ForegroundColor Cyan
git add .
Write-Host "✅ Files added" -ForegroundColor Green

# Check if there are changes to commit
$status = git status --porcelain
if ($status) {
    Write-Host ""
    Write-Host "💾 Committing changes..." -ForegroundColor Cyan
    git commit -m "Initial commit - Kanchi University App"
    Write-Host "✅ Changes committed" -ForegroundColor Green
} else {
    Write-Host "ℹ️  No changes to commit" -ForegroundColor Blue
}

# Check for remote
$remote = git remote get-url origin 2>$null
if ($remote) {
    Write-Host ""
    Write-Host "ℹ️  Remote already configured: $remote" -ForegroundColor Blue
    $useExisting = Read-Host "Use existing remote? (Y/n)"
    if ($useExisting -eq "n" -or $useExisting -eq "N") {
        git remote remove origin
        $remote = $null
    }
}

if (-not $remote) {
    Write-Host ""
    Write-Host "🔗 Setting up GitHub remote..." -ForegroundColor Cyan
    Write-Host ""
    Write-Host "First, create a repository on GitHub:" -ForegroundColor Yellow
    Write-Host "1. Go to: https://github.com/new" -ForegroundColor Yellow
    Write-Host "2. Repository name: kanchi-university-app" -ForegroundColor Yellow
    Write-Host "3. DO NOT check any boxes (no README, .gitignore, license)" -ForegroundColor Yellow
    Write-Host "4. Click 'Create repository'" -ForegroundColor Yellow
    Write-Host ""
    
    $githubUsername = Read-Host "Enter your GitHub username"
    $repoName = Read-Host "Enter repository name (default: kanchi-university-app)" 
    if (-not $repoName) { $repoName = "kanchi-university-app" }
    
    $repoUrl = "https://github.com/$githubUsername/$repoName.git"
    
    Write-Host ""
    Write-Host "Adding remote: $repoUrl" -ForegroundColor Cyan
    git remote add origin $repoUrl
    Write-Host "✅ Remote added" -ForegroundColor Green
}

# Rename branch to main
Write-Host ""
Write-Host "🌿 Setting branch to 'main'..." -ForegroundColor Cyan
git branch -M main
Write-Host "✅ Branch set to 'main'" -ForegroundColor Green

# Push to GitHub
Write-Host ""
Write-Host "📤 Pushing to GitHub..." -ForegroundColor Cyan
Write-Host ""
Write-Host "⚠️  IMPORTANT: When prompted for credentials:" -ForegroundColor Yellow
Write-Host "   Username: Your GitHub username" -ForegroundColor Yellow
Write-Host "   Password: Use a Personal Access Token (NOT your GitHub password)" -ForegroundColor Yellow
Write-Host ""
Write-Host "   Create token at: https://github.com/settings/tokens" -ForegroundColor Yellow
Write-Host "   Select scopes: repo, workflow" -ForegroundColor Yellow
Write-Host ""
$continue = Read-Host "Ready to push? (Y/n)"
if ($continue -eq "n" -or $continue -eq "N") {
    Write-Host "Cancelled. Run this script again when ready." -ForegroundColor Yellow
    exit 0
}

try {
    git push -u origin main
    Write-Host ""
    Write-Host "✅ Code pushed to GitHub!" -ForegroundColor Green
    Write-Host ""
    Write-Host "🎉 Next Steps:" -ForegroundColor Cyan
    Write-Host "1. Go to: https://vercel.com" -ForegroundColor Yellow
    Write-Host "2. Sign up/Login with GitHub" -ForegroundColor Yellow
    Write-Host "3. Click 'Add New Project'" -ForegroundColor Yellow
    Write-Host "4. Import your repository: $repoName" -ForegroundColor Yellow
    Write-Host "5. Set Root Directory to: backend" -ForegroundColor Yellow
    Write-Host "6. Add environment variables (see DEPLOYMENT_READY.md)" -ForegroundColor Yellow
    Write-Host "7. Click 'Deploy'" -ForegroundColor Yellow
    Write-Host ""
} catch {
    Write-Host ""
    Write-Host "❌ Push failed. Check your credentials and try again." -ForegroundColor Red
    Write-Host "Make sure you're using a Personal Access Token, not your password." -ForegroundColor Yellow
}

