import { View, Text, FlatList, TouchableOpacity, ToastAndroid } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import { CreateTripContext } from '../../context/CreateTripContext';
import { SelectTransportOptions } from '../../constants/Options';

export default function SelectTransport() {
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState(null);
  const { tripData, setTripData } = useContext(CreateTripContext);
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: '',
    });
  }, []);

  const onContinue = () => {
    if (!selectedOption) {
      ToastAndroid.show('Please select a transport mode', ToastAndroid.LONG);
      return;
    }
    setTripData({ ...tripData, transportMode: selectedOption });
    router.push('/create-trip/review-trip');
  };

  return (
    <View style={{ padding: 25, paddingTop: 75, backgroundColor: '#fff', height: '100%' }}>
      <Text style={{ fontWeight: '900', fontSize: 35, marginTop: 20 }}>Travel Mode</Text>
      <Text style={{ fontSize: 16, color: '#808080', marginTop: 8, marginBottom: 20 }}>
        How do you want to travel from {tripData?.currentLocation?.name} to {tripData?.locationInfo?.name}?
      </Text>

      <FlatList
        data={SelectTransportOptions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const isSelected = selectedOption?.id === item.id;
          return (
            <TouchableOpacity
              onPress={() => setSelectedOption(item)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 18,
                borderRadius: 15,
                borderWidth: 2,
                borderColor: isSelected ? '#111827' : '#e5e7eb',
                backgroundColor: isSelected ? '#f0fdf4' : '#f9fafb',
                marginBottom: 12,
              }}
            >
              <Text style={{ fontSize: 32, marginRight: 16 }}>{item.icon}</Text>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 18, fontWeight: '700', color: '#111827' }}>{item.title}</Text>
                <Text style={{ fontSize: 14, color: '#6b7280', marginTop: 2 }}>{item.desc}</Text>
              </View>
              {isSelected && (
                <View style={{
                  width: 24, height: 24, borderRadius: 12,
                  backgroundColor: '#111827', justifyContent: 'center', alignItems: 'center'
                }}>
                  <Text style={{ color: '#fff', fontSize: 14, fontWeight: '900' }}>✓</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        }}
      />

      <TouchableOpacity
        onPress={onContinue}
        style={{
          padding: 15, backgroundColor: '#111827',
          borderRadius: 15, marginTop: 10,
          opacity: selectedOption ? 1 : 0.5,
        }}
      >
        <Text style={{ textAlign: 'center', color: '#fff', fontWeight: '600', fontSize: 20 }}>
          Continue
        </Text>
      </TouchableOpacity>
    </View>
  );
}
