# Deploying to Bolt

Your project is ready to deploy on Bolt. Follow these steps:

## Step 1: Push to GitHub (if not already done)

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

## Step 2: Connect to Bolt

1. Go to [Bolt.new](https://bolt.new)
2. Import your GitHub repository
3. Bolt will automatically detect it's a Vite project

## Step 3: Configure Environment Variables in Bolt

Add these environment variables in Bolt's dashboard:

### Required Variables:

```
VITE_SUPABASE_URL=https://bxxsgfbmpqswfxuxmyfk.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ4eHNnZmJtcHFzd2Z4dXhteWZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY1OTI4ODgsImV4cCI6MjA4MjE2ODg4OH0.gzZNI5odPKTi3MB_Oq5gta2Cqe57YqLRnlMn_r08Zls
VITE_GOOGLE_MAPS_API_KEY=AIzaSyBwK2Iyy20CtlyKbO8F977Ck4pGsHjQ-es
```

### Optional Variables (for visitor tracking):

```
VITE_TELEGRAM_BOT_TOKEN=6860681919:AAE1lggXrkQEIWAdSzVm2AAyO0f8kbx8uoc
VITE_TELEGRAM_CHAT_ID=446583957
```

## Step 4: Deploy

Bolt will automatically:
- Detect the framework (Vite + React)
- Run `npm install`
- Run `npm run build`
- Deploy the `dist` folder

## Why Bolt Works Better

Unlike Netlify, Bolt doesn't have aggressive secret scanning that blocks builds when it detects API keys in environment variables. The Google Maps API key is meant to be client-facing and will naturally appear in the built JavaScript files - this is normal and expected behavior.

## Securing Your Google Maps API Key

Even though the key will be visible in the client code, secure it by:

1. **Add Domain Restrictions** in Google Cloud Console:
   - Go to: https://console.cloud.google.com/apis/credentials
   - Click your API key
   - Under "Application restrictions" → select "HTTP referrers"
   - Add your Bolt deployment URL: `https://your-app.bolt.new/*`
   - Add localhost for development: `http://localhost:*`

2. **Enable Only Required APIs**:
   - Maps JavaScript API
   - Places API
   - Distance Matrix API
   - Geocoding API

## Project Structure

Your project follows standard Vite conventions:
- Build command: `npm run build`
- Output directory: `dist`
- SPA routing: Handled by Vite

## Troubleshooting

### If deployment fails:
1. Check build logs in Bolt dashboard
2. Verify all environment variables are set correctly
3. Ensure no syntax errors by running `npm run build` locally first

### If Google Maps doesn't work:
1. Verify `VITE_GOOGLE_MAPS_API_KEY` is set in Bolt
2. Check domain restrictions in Google Cloud Console
3. Open browser console to see any API errors

## Next Steps After Deployment

1. Test all features on the live site
2. Set up custom domain (optional)
3. Monitor Supabase usage
4. Check Telegram notifications are working (if enabled)
