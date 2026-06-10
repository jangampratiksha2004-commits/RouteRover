# RouteRover 🗺️

An AI-powered travel planner mobile app built with React Native & Expo. Plan trips, get hotel suggestions, flight info, and day-by-day itineraries using Google Gemini AI.

## Features
- AI-generated trip plans using Google Gemini
- Google Places search for destinations
- Hotel & flight recommendations
- Day-by-day itinerary planner
- Firebase authentication & data storage

## Tech Stack
- React Native (Expo)
- Firebase (Auth + Firestore)
- Google Gemini AI
- Google Places API
- Expo Router

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/jangampratiksha2004-commits/RouteRover.git
cd RouteRover
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
```bash
cp .env.example .env
```
Fill in your API keys in the `.env` file:
- `EXPO_PUBLIC_GOOGLE_MAP_KEY` — [Google Maps/Places API](https://console.cloud.google.com/)
- `EXPO_PUBLIC_GEMINI_API_KEY` — [Google Gemini AI](https://makersuite.google.com/)
- `EXPO_PUBLIC_FIREBASE_API_KEY` — [Firebase Console](https://console.firebase.google.com/)

### 4. Start the app
```bash
npx expo start
```

Scan the QR code with **Expo Go** app on your phone, or run on an emulator.

## Environment Variables
Never commit your `.env` file. Use `.env.example` as a template.
