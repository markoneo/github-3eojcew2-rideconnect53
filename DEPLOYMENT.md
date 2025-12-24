# Deployment Guide

## Environment Variables

This application requires the following environment variables to be configured in your deployment platform:

### Required Variables

1. **VITE_SUPABASE_URL**
   - Your Supabase project URL
   - Example: `https://your-project.supabase.co`

2. **VITE_SUPABASE_ANON_KEY**
   - Your Supabase anonymous key
   - Found in: Supabase Dashboard > Project Settings > API

3. **VITE_GOOGLE_MAPS_API_KEY**
   - Your Google Maps API key
   - Get from: Google Cloud Console > APIs & Services > Credentials
   - Value: `AIzaSyBwK2Iyy20CtlyKbO8F977Ck4pGsHjQ-es`

## Google Maps API Key Security

The Google Maps API key is a **client-side key** that will be visible in your frontend code. This is normal and expected for Google Maps integration. To secure it:

1. **Enable Domain Restrictions** in Google Cloud Console:
   - Go to Google Cloud Console > APIs & Services > Credentials
   - Click on your API key
   - Under "Application restrictions", select "HTTP referrers"
   - Add your domain: `your-domain.com/*`
   - Add localhost for development: `localhost/*`

2. **Enable Only Required APIs**:
   - Maps JavaScript API
   - Places API
   - Distance Matrix API
   - Geocoding API

## Deployment Platform Configuration

### For Vercel, Netlify, or similar platforms:

1. Go to your project settings
2. Find "Environment Variables" section
3. Add each variable listed above
4. Redeploy your application

### Important Notes

- The `.env` file is gitignored and should NOT be committed to your repository
- Set environment variables directly in your deployment platform
- Google Maps API keys will be visible in client-side code (this is expected)
- Protect the key using domain restrictions in Google Cloud Console

## Supabase Edge Functions

Email functionality uses Supabase Edge Functions. Configure these secrets in Supabase:

1. Go to Supabase Dashboard > Project Settings > Edge Functions
2. Add the following secrets:
   - `EMAILJS_SERVICE_ID`: Your EmailJS service ID
   - `EMAILJS_PUBLIC_KEY`: Your EmailJS public key
   - `GOOGLE_MAPS_API_KEY`: Same Google Maps API key (for server-side use if needed)

## Troubleshooting

### "Exposed secrets detected" Error

If your deployment platform flags the Google Maps API key as an exposed secret:

1. Ensure the key is NOT in any source files (only in environment variables)
2. Check that `.env` is properly gitignored
3. The key will still appear in built files (this is normal for client-side keys)
4. Configure domain restrictions in Google Cloud Console to protect the key

### Address Autocomplete Not Working

1. Verify `VITE_GOOGLE_MAPS_API_KEY` is set in deployment environment
2. Check that the Google Maps JavaScript API is enabled in Google Cloud Console
3. Verify domain restrictions allow your deployment domain
4. Check browser console for API errors
