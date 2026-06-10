// Debug Test - Run this to check each component
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// Test 1: Check API Key
console.log('🔑 API Key Test:');
console.log('Gemini API Key exists:', !!process.env.EXPO_PUBLIC_GOOGLE_GEMINI_API_KEY);
console.log('Gemini API Key:', process.env.EXPO_PUBLIC_GOOGLE_GEMINI_API_KEY?.substring(0, 10) + '...');

// Test 2: Check Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyC_VplKYEzSNGUDtKlGzscPiuHZem6Ke7E",
  authDomain: "routerover-ab969.firebaseapp.com",
  projectId: "routerover-ab969",
  storageBucket: "routerover-ab969.firebasestorage.app",
  messagingSenderId: "847619490637",
  appId: "1:847619490637:web:d55a54414e517cd50bed04"
};

console.log('🔥 Firebase Test:');
try {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  console.log('✅ Firebase initialized successfully');
} catch (error) {
  console.log('❌ Firebase error:', error.message);
}

// Test 3: Check AI API
console.log('🤖 AI API Test:');
const testAI = async () => {
  try {
    const { GoogleGenerativeAI } = require("@google/generative-ai");
    const genAI = new GoogleGenerativeAI(process.env.EXPO_PUBLIC_GOOGLE_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const result = await model.generateContent("Say hello");
    console.log('✅ AI API working:', result.response.text());
  } catch (error) {
    console.log('❌ AI API error:', error.message);
  }
};

// Uncomment to test AI (only run this in a proper environment)
// testAI();

export default function DebugTest() {
  return null;
}