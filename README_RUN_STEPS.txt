Detailed run steps (expanded):

1) Install node (recommended 18.x LTS) and npm or yarn.
2) Install Expo CLI globally (optional): npm install -g expo-cli
   OR use npx: npx expo start
3) Unzip or open this folder: react-native-metals
4) Run: npm install
5) Configure API key:
   - open src/config.js and paste your API key and base URL for your price API
   - If the provider needs a different header name (e.g. x-access-token or Authorization), update src/api/prices.js header config.
6) Start the dev server: npm start
7) Use an emulator or Expo Go app on your phone (scan QR).
8) To build native apps, follow Expo docs for building binaries.
