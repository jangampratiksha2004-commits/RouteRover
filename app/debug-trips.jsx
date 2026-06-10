import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../configs/FirebaseConfig';
import { useRouter } from 'expo-router';

export default function DebugTrips() {
  const [trips, setTrips] = useState([]);
  const router = useRouter();
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      fetchTrips();
    }
  }, [user]);

  const fetchTrips = async () => {
    try {
      const q = query(collection(db, 'UserTrips'), where('userEmail', '==', user?.email));
      const querySnapshot = await getDocs(q);
      
      const tripsData = [];
      querySnapshot.forEach((doc) => {
        tripsData.push(doc.data());
      });
      setTrips(tripsData);
    } catch (error) {
      console.error('Error fetching trips:', error);
    }
  };

  return (
    <ScrollView style={{ flex: 1, padding: 20, paddingTop: 60 }}>
      <TouchableOpacity 
        onPress={() => router.back()}
        style={{ marginBottom: 20, padding: 10, backgroundColor: '#000', borderRadius: 5 }}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>Back</Text>
      </TouchableOpacity>

      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
        Debug: Your Trips Data
      </Text>

      {trips.map((trip, index) => (
        <View key={index} style={{ 
          backgroundColor: '#f5f5f5', 
          padding: 15, 
          marginBottom: 15, 
          borderRadius: 10 
        }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
            Trip {index + 1}
          </Text>
          
          <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'blue' }}>
            Trip Plan Structure:
          </Text>
          <Text style={{ fontSize: 12, fontFamily: 'monospace', marginBottom: 10 }}>
            {JSON.stringify(trip.tripPlan, null, 2)}
          </Text>
          
          <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'green' }}>
            Trip Data:
          </Text>
          <Text style={{ fontSize: 12, fontFamily: 'monospace' }}>
            {trip.tripData}
          </Text>
        </View>
      ))}

      {trips.length === 0 && (
        <Text style={{ textAlign: 'center', color: '#666', marginTop: 50 }}>
          No trips found
        </Text>
      )}
    </ScrollView>
  );
}