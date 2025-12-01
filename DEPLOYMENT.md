# Deploying Dyslexia Support App to Render

This guide will help you deploy your Dyslexia Support App to Render as a free static website.

## Prerequisites

1. A GitHub account (create one at https://github.com if you don't have one)
2. A Render account (sign up at https://render.com - it's free!)
3. Git installed on your computer

## Step-by-Step Deployment Guide

### Step 1: Initialize Git Repository (if not already done)

Open your terminal/command prompt in the `dyslexia-app` folder and run:

```bash
git init
git add .
git commit -m "Initial commit: Dyslexia Support App"
```

### Step 2: Create a GitHub Repository

1. Go to https://github.com/new
2. Repository name: `dyslexia-support-app` (or any name you prefer)
3. Description: "A comprehensive dyslexia support web application with reading assistance and interactive games"
4. Choose **Public** (required for free Render hosting)
5. **Do NOT** initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

### Step 3: Push Your Code to GitHub

After creating the repository, GitHub will show you commands. Use these:

```bash
git remote add origin https://github.com/YOUR_USERNAME/dyslexia-support-app.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

### Step 4: Deploy to Render

#### Option A: Using Render Dashboard (Recommended)

1. Go to https://dashboard.render.com
2. Click "New +" button
3. Select "Static Site"
4. Click "Connect a repository" and authorize Render to access your GitHub
5. Find and select your `dyslexia-support-app` repository
6. Configure the deployment:
   - **Name**: `dyslexia-support-app` (or your preferred name)
   - **Branch**: `main`
   - **Build Command**: Leave empty or use `echo "Static site"`
   - **Publish Directory**: `.` (just a dot - means root directory)
7. Click "Create Static Site"

#### Option B: Using render.yaml (Automatic)

Since we've included a `render.yaml` file:

1. Go to https://dashboard.render.com
2. Click "New +" → "Blueprint"
3. Connect your GitHub repository
4. Render will automatically detect the `render.yaml` configuration
5. Click "Apply" to deploy

### Step 5: Wait for Deployment

- Render will build and deploy your site (usually takes 1-2 minutes)
- You'll see the deployment progress in real-time
- Once complete, you'll get a URL like: `https://dyslexia-support-app.onrender.com`

### Step 6: Access Your Live Site

Your app will be live at the URL Render provides! 🎉

## Updating Your Deployed Site

Whenever you make changes to your app:

```bash
git add .
git commit -m "Describe your changes here"
git push origin main
```

Render will automatically detect the changes and redeploy your site!

## Custom Domain (Optional)

If you want to use your own domain:

1. Go to your Render dashboard
2. Select your static site
3. Go to "Settings" → "Custom Domains"
4. Click "Add Custom Domain"
5. Follow the instructions to configure your DNS

## Troubleshooting

### Issue: Fonts not loading
**Solution**: The OpenDyslexic font uses a CDN, so it should work fine. If issues occur, check browser console.

### Issue: PDF/EPUB files not uploading
**Solution**: This is client-side only - all file processing happens in the browser, so it should work perfectly on Render.

### Issue: 404 errors on refresh
**Solution**: The `render.yaml` includes routing configuration to handle this. If you used Option A, add this to your Render settings:
- Redirects/Rewrites: `/*` → `/index.html` (200)

## Free Tier Limitations

Render's free tier for static sites includes:
- ✅ Unlimited bandwidth
- ✅ Global CDN
- ✅ Automatic HTTPS
- ✅ Auto-deploy from Git
- ✅ Custom domains

Perfect for this project!

## Alternative: Quick Deploy Button

You can also add this badge to your README.md for one-click deployment:

```markdown
[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)
```

## Support

If you encounter any issues:
- Check Render's documentation: https://render.com/docs/static-sites
- Check deployment logs in Render dashboard
- Ensure all file paths use relative paths (not absolute)

---

**Your dyslexia support app is now live and accessible to everyone! 🚀**
