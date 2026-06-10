import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { GetHotelImage } from '../../services/GooglePlaceApi';
import { getFallbackImage } from '../../services/FallbackImages';
import { extractLocationContext } from '../../utils/LocationUtils';

export default function HotelCard({ item, tripData = null }) {
  const router = useRouter();
  const [photoUrl, setPhotoUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHotelImage();
  }, []);

  const loadHotelImage = async () => {
    try {
      setLoading(true);
      const hotelName = item.hotelName || item.name;
      setPhotoUrl(getFallbackImage(hotelName));

      const locationContext = extractLocationContext(tripData) || { city: 'Pune', country: 'India' };
      const url = await GetHotelImage(hotelName, locationContext);
      if (url) setPhotoUrl(url);
    } catch (error) {
      console.error('Error loading hotel image:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableOpacity
      style={{ marginRight: 15, width: 180 }}
      onPress={() => router.push({ pathname: '/hotel-details', params: { hotel: JSON.stringify(item) } })}
      activeOpacity={0.7}
    >
      {loading ? (
        <View style={{
          width: 180, height: 120, borderRadius: 15,
          backgroundColor: '#f0f0f0', justifyContent: 'center', alignItems: 'center',
        }}>
          <Text>Loading...</Text>
        </View>
      ) : (
        <Image
          source={{ uri: photoUrl }}
          style={{ width: 180, height: 120, borderRadius: 15 }}
          onError={() => setPhotoUrl(getFallbackImage(item.hotelName || item.name))}
        />
      )}
      <View style={{ padding: 5 }}>
        <Text style={{ fontSize: 13, fontWeight: '500' }}>{item.name}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text>⭐ {item.rating}</Text>
          <Text>💰 {item.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
