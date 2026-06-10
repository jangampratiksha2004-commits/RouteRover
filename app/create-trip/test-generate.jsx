import { View, Text, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

export default function TestGenerate() {
  const [testing, setTesting] = useState(false);
  const [results, setResults] = useState([]);

  const addResult = (test, status, message) => {
    setResults(prev => [...prev, { test, status, message }]);
  };

  const runTests = async () => {
    setTesting(true);
    setResults([]);

    // Test 1: API Key
    const apiKey = process.env.EXPO_PUBLIC_GOOGLE_GEMINI_API_KEY;
    if (apiKey) {
      addResult('API Key', '✅', 'Found');
    } else {
      addResult('API Key', '❌', 'Missing');
      setTesting(false);
      return;
    }

    // Test 2: AI API
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      const result = await model.generateContent("Say hello");
      const response = result.response.text();
      
      addResult('AI API', '✅', 'Working');
    } catch (error) {
      addResult('AI API', '❌', error.message);
    }

    // Test 3: Firestore (basic test)
    try {
      const { initializeApp } = require('firebase/app');
      const { getFirestore } = require('firebase/firestore');
      
      const firebaseConfig = {
        apiKey: "AIzaSyC_VplKYEzSNGUDtKlGzscPiuHZem6Ke7E",
        authDomain: "routerover-ab969.firebaseapp.com",
        projectId: "routerover-ab969"
      };
      
      const app = initializeApp(firebaseConfig);
      const db = getFirestore(app);
      
      addResult('Firebase', '✅', 'Connected');
    } catch (error) {
      addResult('Firebase', '❌', error.message);
    }

    setTesting(false);
  };

  return (
    <View style={{ padding: 20, paddingTop: 60 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
        Debug Tests
      </Text>

      <TouchableOpacity
        onPress={runTests}
        disabled={testing}
        style={{
          backgroundColor: testing ? '#ccc' : '#000',
          padding: 15,
          borderRadius: 10,
          marginBottom: 20
        }}
      >
        <Text style={{ color: 'white', textAlign: 'center', fontSize: 16 }}>
          {testing ? 'Testing...' : 'Run Tests'}
        </Text>
      </TouchableOpacity>

      {results.map((result, index) => (
        <View key={index} style={{ 
          flexDirection: 'row', 
          padding: 10, 
          backgroundColor: '#f5f5f5',
          marginBottom: 5,
          borderRadius: 5
        }}>
          <Text style={{ fontSize: 16, flex: 1 }}>{result.test}</Text>
          <Text style={{ fontSize: 16, marginRight: 10 }}>{result.status}</Text>
          <Text style={{ fontSize: 12, color: '#666', flex: 2 }}>{result.message}</Text>
        </View>
      ))}
    </View>
  );
}