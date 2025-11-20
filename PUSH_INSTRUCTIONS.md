# Quick Guide: Push Your Portfolio to GitHub

## Step 1: Create GitHub Repository

1. **Go to GitHub**: Open https://github.com/new in your browser
2. **Repository Name**: Enter `portfolio` or `chokalingam-codes-portfolio`
3. **Description**: "My personal portfolio website"
4. **Visibility**: Choose Public or Private
5. **Important**: Do NOT check "Add a README file" or any other initialization options
6. **Click**: "Create repository"

## Step 2: Get Your Repository URL

After creating the repository, GitHub will show you a page with setup instructions. Copy the HTTPS URL, which looks like:
```
https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```

## Step 3: Push Your Code

### Option A: Use the PowerShell Script (Easiest)

1. Right-click on `push-to-github.ps1` in your folder
2. Select "Run with PowerShell"
3. When prompted, paste your GitHub repository URL
4. The script will automatically push your code

### Option B: Manual Commands

Open PowerShell in this folder and run:

```powershell
# Replace with your actual repository URL
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

## Authentication

If you're asked for credentials:
- **Username**: Your GitHub username
- **Password**: Use a Personal Access Token (NOT your GitHub password)

### To create a Personal Access Token:
1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Give it a name like "Portfolio Push"
4. Select scope: `repo` (full control of private repositories)
5. Click "Generate token"
6. Copy the token and use it as your password when pushing

## Troubleshooting

- **"Remote already exists"**: Run `git remote set-url origin YOUR_URL` instead
- **Authentication failed**: Make sure you're using a Personal Access Token, not your password
- **Repository not found**: Double-check the URL and make sure the repository exists on GitHub

## Success!

Once pushed, your portfolio will be available at:
`https://github.com/YOUR_USERNAME/YOUR_REPO_NAME`

### Enable GitHub Pages (docs folder)

1. Go to the repository on GitHub → **Settings** → **Pages**
2. Under **Build and deployment**, choose **Deploy from a branch**
3. Select **Branch** = `main`, **Folder** = `/docs`, then click **Save**
4. After the build finishes, your site will be live at:
   `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

