// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore }   from 'firebase/firestore';
import { getStorage }     from 'firebase/storage';

const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FB_APIKEY,
  authDomain:        import.meta.env.VITE_FB_AUTH,
  projectId:         import.meta.env.VITE_FB_PID,
  storageBucket:     import.meta.env.VITE_FB_BUCKET,
  messagingSenderId: import.meta.env.VITE_FB_SENDER,
  appId:             import.meta.env.VITE_FB_APPID,
};

// ======== DEBUG LOG ========
console.log('🔥 Firebase config:', firebaseConfig);
// ==========================

const app     = initializeApp(firebaseConfig);
export const db      = getFirestore(app);
export const storage = getStorage(app);
