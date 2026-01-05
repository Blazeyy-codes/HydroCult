// This file is being kept for backwards compatibility.
// New projects should use environment variables and the initializeApp() function without arguments.
// For more information, see: https://firebase.google.com/docs/hosting/reserved-urls#sdk-initialization

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};
