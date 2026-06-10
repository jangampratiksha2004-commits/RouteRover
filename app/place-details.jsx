import { View, Text, Image, ScrollView, TouchableOpacity, Linking } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { GetPhotoRef, GetPhotoUrl } from '../services/GooglePlaceApi';
import { getFallbackImage } from '../services/FallbackImages';

export default function PlaceDetails() {
  const navigation = useNavigation();
  const { place } = useLocalSearchParams();
  const [placeData, setPlaceData] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: '',
    });

    try {
      const parsedPlace = JSON.parse(place);
      setPlaceData(parsedPlace);
      loadPlaceImage(parsedPlace.name);
    } catch (error) {
      console.log('Error parsing place data:', error);
    }
  }, []);

  const loadPlaceImage = async (placeName) => {
    try {
      const fallbackUrl = getFallbackImage(placeName);
      setPhotoUrl(fallbackUrl);
      
      const photoRef = await GetPhotoRef(placeName);
      if (photoRef) {
        const url = GetPhotoUrl(photoRef, 800);
        setPhotoUrl(url);
      }
    } catch (error) {
      console.error('Error loading place image:', error);
    }
  };

  const openInMaps = () => {
    if (placeData?.location?.lat && placeData?.location?.lng) {
      const { lat, lng } = placeData.location;
      const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
      Linking.openURL(url);
    } else if (placeData?.name) {
      const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(placeData.name)}`;
      Linking.openURL(url);
    }
  };

  if (!placeData) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      <Image
        source={{ uri: photoUrl || getFallbackImage(placeData.name) }}
        style={{
          width: '100%',
          height: 300,
          objectFit: 'cover',
        }}
        onError={() => {
          setPhotoUrl(getFallbackImage(placeData.name));
        }}
      />
      
      <View style={{
        padding: 20,
        backgroundColor: '#fff',
        marginTop: -20,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        minHeight: '70%'
      }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Text style={{
            fontSize: 28,
            fontWeight: '900',
            flex: 1,
            marginRight: 10
          }}>
            {placeData.name}
          </Text>
          
          <TouchableOpacity
            style={{
              backgroundColor: '#4285F4',
              padding: 12,
              borderRadius: 10,
            }}
            onPress={openInMaps}
          >
            <Ionicons name="map" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <Text style={{
          fontSize: 18,
          color: 'gray',
          marginTop: 10,
          lineHeight: 24
        }}>
          {placeData.details}
        </Text>

        <View style={{
          backgroundColor: '#f8f9fa',
          padding: 20,
          borderRadius: 15,
          marginTop: 20
        }}>
          <Text style={{
            fontSize: 20,
            fontWeight: '700',
            marginBottom: 15,
            color: '#333'
          }}>
            Visit Information
          </Text>
          
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
            <Ionicons name="ticket-outline" size={20} color="#4285F4" />
            <Text style={{
              fontSize: 16,
              marginLeft: 10,
              fontWeight: '600'
            }}>
              Ticket Price: <Text style={{ color: '#4285F4' }}>{placeData.ticketPricing || 'Free'}</Text>
            </Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
            <Ionicons name="time-outline" size={20} color="#4285F4" />
            <Text style={{
              fontSize: 16,
              marginLeft: 10,
              fontWeight: '600'
            }}>
              Best Time to Visit: <Text style={{ color: '#4285F4' }}>{placeData.timeToVisit || 'Anytime'}</Text>
            </Text>
          </View>

          {placeData.location && (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="location-outline" size={20} color="#4285F4" />
              <Text style={{
                fontSize: 16,
                marginLeft: 10,
                fontWeight: '600'
              }}>
                Coordinates: <Text style={{ color: '#4285F4' }}>
                  {placeData.location.lat?.toFixed(4)}, {placeData.location.lng?.toFixed(4)}
                </Text>
              </Text>
            </View>
          )}
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: '#4285F4',
            padding: 15,
            borderRadius: 10,
            marginTop: 30,
            alignItems: 'center'
          }}
          onPress={openInMaps}
        >
          <Text style={{
            color: 'white',
            fontSize: 18,
            fontWeight: '600'
          }}>
            Open in Maps
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}