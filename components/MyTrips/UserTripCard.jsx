import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import moment from 'moment';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function UserTripCard({ trip }) {
  const router = useRouter();
  
  if (!trip || !trip.tripData) {
    return null;
  }

  const formatData = (data) => {
    try {
      return JSON.parse(data);
    } catch (error) {
      return {};
    }
  };
  
  const tripData = formatData(trip.tripData);

  return (
    <View
      style={{
        marginTop: 5,
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
      }}
    >
      <Image
        source={require('./../../assets/images/travel-bg.jpg')}
        style={{
          width: 100,
          height: 100,
          borderRadius: 10,
          resizeMode: 'cover',
        }}
      />
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '700',
          }}
        >
          {tripData?.locationInfo?.name || tripData?.destination || 'Trip'}
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: '#808080',
            marginTop: 5,
          }}
        >
          {tripData?.startDate ? moment(tripData.startDate).format('DD MMM yyyy') : 'Date not set'}
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: '#808080',
            marginTop: 5,
          }}
        >
          Traveling: {tripData?.traveler?.title || 'Not specified'}
        </Text>
        <TouchableOpacity 
          style={{
            backgroundColor: 'black',
            padding: 8,
            borderRadius: 7,
            width: 40,
          }}
          onPress={() => router.push({ pathname: '/trip-details', params: { trip: JSON.stringify(trip) } })}
        >
          <Ionicons name="navigate" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}