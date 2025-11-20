# PowerShell script to push portfolio to GitHub
# Run this after creating your GitHub repository

Write-Host "=== Portfolio GitHub Push Script ===" -ForegroundColor Cyan
Write-Host ""

# Prompt for GitHub repository URL
$repoUrl = Read-Host "Enter your GitHub repository URL (e.g., https://github.com/username/repo-name.git)"

if ([string]::IsNullOrWhiteSpace($repoUrl)) {
    Write-Host "Error: Repository URL is required!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Adding remote origin..." -ForegroundColor Yellow
git remote add origin $repoUrl

if ($LASTEXITCODE -ne 0) {
    Write-Host "Remote might already exist. Trying to update..." -ForegroundColor Yellow
    git remote set-url origin $repoUrl
}

Write-Host "Renaming branch to main..." -ForegroundColor Yellow
git branch -M main

Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "Success! Your portfolio has been pushed to GitHub!" -ForegroundColor Green
    Write-Host "Visit your repository at: $repoUrl" -ForegroundColor Cyan
} else {
    Write-Host ""
    Write-Host "Error: Push failed. Please check:" -ForegroundColor Red
    Write-Host "1. Your GitHub repository URL is correct" -ForegroundColor Yellow
    Write-Host "2. You have authentication set up (GitHub username and personal access token)" -ForegroundColor Yellow
    Write-Host "3. The repository exists on GitHub" -ForegroundColor Yellow
}

