# React Native Metals (Expo)

This is a sample React Native (Expo) app that fetches metal prices (Gold, Silver, Palladium, Platinum) and shows a landing page with tiles. Click a tile to view details (previous close, previous open, today's date/time, etc.).

## Features
- Landing page with tiles for each metal.
- Each tile fetches its own price with an independent loader.
- Detail page per metal with extra info and error handling.
- Uses React Navigation for navigation.
- Axios for API requests.
- Fallback mock data if API not configured or returns incomplete data.

## Setup (quick)
1. Install [Node.js](https://nodejs.org/) (LTS) and npm/yarn.
2. Install Expo CLI: `npm install -g expo-cli` (or use `npx expo` commands).
3. Unzip the project and `cd react-native-metals`.
4. Install dependencies: `npm install` or `yarn`.
5. Create a config file with your API key:
   - Copy `src/config.example.js` to `src/config.js` and set `API_KEY` and `BASE_URL`.
   - Example services: `goldprice.io`, `goldapi.io`, etc. Adjust `BASE_URL` to match the provider.
6. Run the app: `npm start` (then press `a` for Android emulator or scan QR with the Expo Go app).

## Important notes about APIs
- This project expects a metals pricing HTTP API and an API key. The exact endpoints differ between providers.
- `src/api/prices.js` contains comment blocks showing where to adapt endpoints for your provider.
- If you don't have an API, the app will show mock data and still run so you can test UI/UX.

## Files of interest
- `App.js` — App entry, navigation setup.
- `src/screens/Home.js` — Landing tiles and per-tile loaders.
- `src/screens/Detail.js` — Detail screen for metals.
- `src/components/MetalTile.js` — Tile component used on Home.
- `src/api/prices.js` — API adapter layer (configure endpoints here).
- `src/config.example.js` — Example config showing where to paste API key.

## How to adapt to your API
Open `src/api/prices.js` and change `BASE_URL` and endpoints according to your provider's docs. The file contains inline guidance for common providers.

Enjoy — if you want I can adapt the API adapter to a specific provider (give me the provider name + example response format or docs link).
