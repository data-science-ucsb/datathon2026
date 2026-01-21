import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBKak9AosJ01jLFryKDLXaH9wZjzz5Pjj4",
  authDomain: "datathon2026-6d524.firebaseapp.com",
  projectId: "datathon2026-6d524",
  storageBucket: "datathon2026-6d524.firebasestorage.app",
  messagingSenderId: "755565057525",
  appId: "1:755565057525:web:27ae8af0ee80d61b4dbcbc",
  measurementId: "G-YH5X9B94Q6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;