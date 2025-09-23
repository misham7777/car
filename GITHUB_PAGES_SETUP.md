# GitHub Pages Setup Guide

This guide will help you configure GitHub Pages for your CarVault project.

## The Problem

The deployment is failing due to environment protection rules that prevent the `main` branch from deploying to GitHub Pages.

## Solution Options

### Option 1: Configure GitHub Pages Settings (Recommended)

1. Go to your repository: `https://github.com/misham7777/car`
2. Click on **Settings** tab
3. Scroll down to **Pages** section in the left sidebar
4. Under **Source**, select **GitHub Actions**
5. Save the settings

### Option 2: Disable Environment Protection Rules

1. Go to **Settings** → **Environments**
2. Click on **github-pages** environment
3. Under **Environment protection rules**, either:
   - Remove the branch restriction that blocks `main`
   - Or add `main` to the allowed branches
4. Save the changes

### Option 3: Use Alternative Workflow

If the above options don't work, we've created a simpler workflow file:
- `pages-simple.yml` - Uses direct deployment without environment restrictions

To use this:
1. Delete or disable the current `pages.yml` workflow
2. The `pages-simple.yml` will automatically take over

## Environment Variables

If you need to set environment variables for the webhook:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Add the following repository secrets:
   - `NEXT_PUBLIC_LEAD_WEBHOOK`: `https://carvault-webhook.vercel.app/api/lead`
   - `NEXT_PUBLIC_LEAD_SOURCE`: `web_form`

## Verification

After making changes:

1. Push a new commit to trigger the workflow
2. Check **Actions** tab to see the deployment status
3. Once successful, your site will be available at:
   `https://misham7777.github.io/car`

## Troubleshooting

### Common Issues:

1. **Environment Protection Rules**: The main issue - solved by the steps above
2. **Permissions**: Make sure the workflow has `pages: write` and `id-token: write` permissions
3. **Branch Restrictions**: Ensure `main` branch is allowed to deploy

### Manual Deployment:

If automated deployment continues to fail, you can manually deploy:

1. Run locally: `npm run pages:build && npm run pages:post`
2. Upload the `out` folder contents to GitHub Pages manually

## Support

If you continue to have issues, check:
- GitHub's documentation on Pages deployment
- The Actions logs for specific error messages
- Repository settings for any additional restrictions
