import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import moment from 'moment';
import UserTripCard from './UserTripCard';
import { useRouter } from 'expo-router';

export default function UserTripList({ userTrips }) {
  const router = useRouter();

  if (!userTrips || userTrips.length === 0) {
    return (
      <View>
        <Text>No trips found</Text>
      </View>
    );
  }

  let LatestTrip;
  try {
    LatestTrip = JSON.parse(userTrips[userTrips.length - 1].tripData);
  } catch (error) {
    LatestTrip = {};
  }

  return (
    <View>
      <View style={{ marginTop: 10 }}>
        <Image
          source={require('./../../assets/images/travel-bg.jpg')}
          style={{
            width: '100%',
            height: 260,
            objectFit: 'cover',
            borderRadius: 15
          }}
        />

        <Text style={{
          fontSize: 24,
          fontWeight: '900',
          marginTop: 4,
        }}>
          {LatestTrip?.locationInfo?.name || LatestTrip?.destination || 'My Trip'}
        </Text>

        <Text style={{
          fontSize: 20,
          fontWeight: '600',
          marginTop: 2,
        }}>
          {LatestTrip?.destination || 'Destination'}
        </Text>

        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 4,
        }}>
          <Text style={{ fontSize: 17 }}>
            {LatestTrip?.startDate ? moment(LatestTrip.startDate).format('DD MMM yyyy') : 'Date not set'}
          </Text>
          <Text style={{ fontSize: 17 }}>
            🚌 {LatestTrip?.traveler?.title || 'Solo'}
          </Text>
        </View>

        <TouchableOpacity 
          onPress={() => router.push({ pathname: '/trip-details', params: { trip: JSON.stringify(userTrips[userTrips.length - 1]) } })}
          style={{
            padding: 15,
            backgroundColor: 'black',
            borderRadius: 15,
            marginTop: 20
          }}
        >
          <Text style={{
            textAlign: 'center',
            color: '#fff',
            fontWeight: '600',
            fontSize: 20
          }}> 
            See your plan 
          </Text>
        </TouchableOpacity>

        {userTrips.map((trip, index) => (
          <UserTripCard trip={trip} key={index} />
        ))}
      </View>
    </View>
  );
}