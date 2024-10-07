import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ["**/*.lottie"],
  define: {
    // env variable from .env file
    "process.env.GOOGLE_CLIENT_ID": JSON.stringify(
      process.env.GOOGLE_CLIENT_ID
    ),
    "process.env.FIREBASE_APIKEY": JSON.stringify(process.env.FIREBASE_APIKEY),
    "process.env.FIREBASE_AUTH_DOMAIN": JSON.stringify(
      process.env.FIREBASE_AUTH_DOMAIN
    ),
    "process.env.FIREBASE_PROJECT_ID": JSON.stringify(
      process.env.FIREBASE_PROJECT_ID
    ),
    "process.env.FIREBASE_STORAGE_BUCKET": JSON.stringify(
      process.env.FIREBASE_STORAGE_BUCKET
    ),
    "process.env.FIREBASE_MESSAGE_SENDER_ID": JSON.stringify(
      process.env.FIREBASE_MESSAGE_SENDER_ID
    ),
    "process.env.FIREBASE_APP_ID": JSON.stringify(process.env.FIREBASE_APP_ID),
    "process.env.FIREBASE_MEASUREMENT_ID": JSON.stringify(
      process.env.FIREBASE_MEASUREMENT_ID
    ),
    "process.env.FIREBASE_DATABSE_URL": JSON.stringify(
      process.env.FIREBASE_DATABSE_URL
    ),
    "process.env.FASTAPI_LINK": JSON.stringify(process.env.FASTAPI_LINK),
  },
});
