import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    APP_NAME: process.env.APP_NAME || "Portfolio Next",
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    AUTHN_RP_ID: process.env.AUTHN_RP_ID,
    AUTHN_ORIGIN: process.env.AUTHN_RP_ID ? `https://${process.env.AUTHN_RP_ID}` : 'http://localhost:3000',
  }
};

export default nextConfig;
