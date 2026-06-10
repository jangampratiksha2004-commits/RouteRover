import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAO8NUBnhJyEdEt0oqwylR_r2xYqxe9N6I",
  authDomain: "routerover-2e96f.firebaseapp.com",
  projectId: "routerover-2e96f",
  storageBucket: "routerover-2e96f.firebasestorage.app",
  messagingSenderId: "749081442262",
  appId: "1:749081442262:web:0d1a1895ee43b677c45677",
  measurementId: "G-1S22LDM73B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export const db = getFirestore(app);