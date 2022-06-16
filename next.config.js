/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  env: {
    firebaseApiKey: process.env.FIREBASE_APIKEY,
    firebaseAuthDomain: process.env.FIREBASE_AUTHDOMAIN,
    firebaseProjectId: process.env.FIREBASE_PROJECTID,
    firebaseStorageBucket: process.env.FIREBASE_STORAGEBUCKET,
    firebaseMessageSenderId: process.env.FIREBASE_SENDERID,
    firebaseAppId: process.env.FIREBASE_APPID,
  },
};

module.exports = nextConfig;
