import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAW-ZhZu96Z-Z26up1qcaTFWS-S53w4NF8",
  authDomain: "ptproject-83533.firebaseapp.com",
  projectId: "ptproject-83533",
  storageBucket: "ptproject-83533.firebasestorage.app",
  messagingSenderId: "837866391455",
  appId: "1:837866391455:web:a123666b67fa29e66c5faa",
  measurementId: "G-ME5PC4BWV1",
};

const app = initializeApp(firebaseConfig);

// Wrap analytics in try/catch — getAnalytics throws if the browser blocks
// measurement scripts (ad-blockers, privacy extensions, or SSR environments).
// A crash here would prevent the entire app from mounting (blank white screen).
let analytics;
try {
  analytics = getAnalytics(app);
} catch (e) {
  console.warn('Firebase Analytics unavailable:', e);
}
export { analytics };

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
