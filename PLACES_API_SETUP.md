# Google Places API Setup Guide

## Issue: Images not loading for places and hotels

### Root Cause
Your current Google Maps API key might not have the required Places API enabled, or there are quota/billing issues.

### Solution Steps

#### 1. Enable Required APIs in Google Cloud Console
Go to [Google Cloud Console](https://console.cloud.google.com/) and enable these APIs:

- ✅ **Maps JavaScript API** (already enabled)
- ✅ **Places API** (REQUIRED for photos)
- ✅ **Places API (New)** (recommended)
- ✅ **Geocoding API** (optional, for better location search)

#### 2. Check API Key Restrictions
In Google Cloud Console > APIs & Services > Credentials:
- Make sure your API key has permissions for Places API
- Check if there are any application restrictions that might block requests

#### 3. Verify Billing
- Ensure your Google Cloud project has billing enabled
- Places API requests are not free after the monthly quota

#### 4. Test Your Setup
Run the test file:
```bash
node test-places-api.js
```

#### 5. Check Quotas
In Google Cloud Console > APIs & Services > Quotas:
- Places API: 100 requests per day (free tier)
- Places Photo: 1,000 requests per day (free tier)

### Common Issues & Solutions

#### Issue: "This API project is not authorized to use this API"
**Solution**: Enable Places API in Google Cloud Console

#### Issue: "You must enable Billing on the Google Cloud Project"
**Solution**: Add a billing account to your project

#### Issue: Images load but show "Image Not Available"
**Solution**: The place name might not exist in Google's database. Try:
- More specific names (e.g., "Taj Mahal Agra" instead of "Taj Mahal")
- Alternative names
- Check console logs for API errors

#### Issue: API quota exceeded
**Solution**: 
- Wait for quota reset (daily)
- Upgrade to paid plan
- Implement caching to reduce API calls

### Testing Your Fix
1. Clear your app cache
2. Restart the development server
3. Check browser/app console for error messages
4. Test with well-known places first (Taj Mahal, Eiffel Tower, etc.)

### API Usage Optimization
- Cache photo references locally
- Use smaller image sizes (maxwidth=200 instead of 400)
- Implement fallback images for places without photos