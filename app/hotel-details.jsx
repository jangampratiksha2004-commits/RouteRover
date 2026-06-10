import { View, Text, Image, ScrollView, TouchableOpacity, Linking, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { GetPhotoRef, GetPhotoUrl } from '../services/GooglePlaceApi';
import { getFallbackImage } from '../services/FallbackImages';

export default function HotelDetails() {
  const navigation = useNavigation();
  const { hotel } = useLocalSearchParams();
  const [hotelData, setHotelData] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [hotelDetails, setHotelDetails] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [amenities, setAmenities] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: '',
    });

    try {
      const parsedHotel = JSON.parse(hotel);
      setHotelData(parsedHotel);
      loadHotelImage(parsedHotel.name || parsedHotel.hotelName);
    } catch (error) {
      console.log('Error parsing hotel data:', error);
    }
  }, []);

  const loadHotelImage = async (hotelName) => {
    try {
      const fallbackUrl = getFallbackImage(hotelName);
      setPhotoUrl(fallbackUrl);
      
      const photoRef = await GetPhotoRef(hotelName);
      if (photoRef) {
        const url = GetPhotoUrl(photoRef, 800);
        setPhotoUrl(url);
      }
      
      await loadHotelDetails(hotelName);
    } catch (error) {
      console.error('Error loading hotel image:', error);
    }
  };

  const loadHotelDetails = async (hotelName) => {
    try {
      const mockDetails = {
        rating: (Math.random() * 1.5 + 3.5).toFixed(1),
        totalRatings: Math.floor(Math.random() * 3000) + 200,
        pricePerNight: `₹${Math.floor(Math.random() * 8000) + 2000}`,
        checkIn: '2:00 PM',
        checkOut: '11:00 AM',
        website: `https://www.${hotelName.toLowerCase().replace(/\s+/g, '')}.com`,
        phone: `+91 ${Math.floor(Math.random() * 9000000000) + 1000000000}`,
        overview: `${hotelName} offers exceptional hospitality with modern amenities and comfortable accommodations.`,
        lastUpdated: '2 hours ago'
      };
      
      setHotelDetails(mockDetails);
      
      const mockPhotos = Array.from({length: 8}, (_, i) => ({
        id: i,
        url: getFallbackImage(`${hotelName} room ${i + 1}`),
        type: i < 3 ? 'Room' : i < 6 ? 'Facility' : 'Exterior'
      }));
      setPhotos(mockPhotos);
      
      const mockReviews = [
        { id: 1, author: 'Sneha P.', rating: 5, text: 'Excellent service and clean rooms. Staff was very helpful!', time: '1 day ago' },
        { id: 2, author: 'Vikram R.', rating: 4, text: 'Great location and good amenities. Would stay again.', time: '3 days ago' },
        { id: 3, author: 'Anita D.', rating: 5, text: 'Outstanding hospitality! The breakfast was amazing.', time: '1 week ago' }
      ];
      setReviews(mockReviews);
      
      const hotelAmenities = [
        { icon: 'wifi', name: 'Free WiFi', available: true },
        { icon: 'car', name: 'Parking', available: true },
        { icon: 'restaurant', name: 'Restaurant', available: true },
        { icon: 'fitness', name: 'Gym', available: Math.random() > 0.3 },
        { icon: 'water', name: 'Swimming Pool', available: Math.random() > 0.5 },
        { icon: 'business', name: 'Business Center', available: Math.random() > 0.4 }
      ];
      setAmenities(hotelAmenities);
    } catch (error) {
      console.error('Error loading hotel details:', error);
    }
  };

  const openInMaps = () => {
    if (hotelData?.location?.lat && hotelData?.location?.lng) {
      const { lat, lng } = hotelData.location;
      const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
      Linking.openURL(url);
    } else if (hotelData?.name || hotelData?.hotelName) {
      const hotelName = hotelData.name || hotelData.hotelName;
      const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotelName)}`;
      Linking.openURL(url);
    }
  };

  if (!hotelData) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const hotelName = hotelData.name || hotelData.hotelName;
  const hotelDescription = hotelData.details || hotelData.description || 'A comfortable stay with excellent amenities.';

  return (
    <ScrollView style={{ flex: 1 }}>
      <Image
        source={{ uri: photoUrl || getFallbackImage(hotelName) }}
        style={{
          width: '100%',
          height: 300,
          objectFit: 'cover',
        }}
        onError={() => {
          setPhotoUrl(getFallbackImage(hotelName));
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
            {hotelName}
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
          {hotelDescription}
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
            Hotel Information
          </Text>
          
          {hotelData.rating && (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
              <Ionicons name="star" size={20} color="#FFD700" />
              <Text style={{
                fontSize: 16,
                marginLeft: 10,
                fontWeight: '600'
              }}>
                Rating: <Text style={{ color: '#4285F4' }}>{hotelData.rating}</Text>
              </Text>
            </View>
          )}

          {hotelData.price && (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
              <Ionicons name="cash-outline" size={20} color="#4285F4" />
              <Text style={{
                fontSize: 16,
                marginLeft: 10,
                fontWeight: '600'
              }}>
                Price: <Text style={{ color: '#4285F4' }}>{hotelData.price}</Text>
              </Text>
            </View>
          )}

          {hotelData.address && (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
              <Ionicons name="location-outline" size={20} color="#4285F4" />
              <Text style={{
                fontSize: 16,
                marginLeft: 10,
                fontWeight: '600'
              }}>
                Address: <Text style={{ color: '#4285F4' }}>{hotelData.address}</Text>
              </Text>
            </View>
          )}

          {hotelData.location && (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="navigate-outline" size={20} color="#4285F4" />
              <Text style={{
                fontSize: 16,
                marginLeft: 10,
                fontWeight: '600'
              }}>
                Coordinates: <Text style={{ color: '#4285F4' }}>
                  {hotelData.location.lat?.toFixed(4)}, {hotelData.location.lng?.toFixed(4)}
                </Text>
              </Text>
            </View>
          )}
        </View>

        <View style={{
          backgroundColor: '#e8f5e8',
          padding: 20,
          borderRadius: 15,
          marginTop: 20
        }}>
          <Text style={{
            fontSize: 18,
            fontWeight: '700',
            marginBottom: 10,
            color: '#333'
          }}>
            Amenities
          </Text>
          
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
              <Ionicons name="wifi" size={16} color="#4285F4" />
              <Text style={{ marginLeft: 5, fontSize: 14 }}>Free WiFi</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
              <Ionicons name="car" size={16} color="#4285F4" />
              <Text style={{ marginLeft: 5, fontSize: 14 }}>Parking</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
              <Ionicons name="restaurant" size={16} color="#4285F4" />
              <Text style={{ marginLeft: 5, fontSize: 14 }}>Restaurant</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
              <Ionicons name="fitness" size={16} color="#4285F4" />
              <Text style={{ marginLeft: 5, fontSize: 14 }}>Gym</Text>
            </View>
          </View>
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