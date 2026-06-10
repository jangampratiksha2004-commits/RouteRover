import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { useNavigation, useRouter } from 'expo-router';
import { CreateTripContext } from './../../context/CreateTripContext';

export default function SearchPlace() {
  const navigation = useNavigation();
  const router = useRouter();
  const { tripData, setTripData } = useContext(CreateTripContext);
  const [currentLocation, setCurrentLocation] = useState('');
  const [destination, setDestination] = useState('');

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: 'Search Place',
    });
  }, []);

  const handleContinue = () => {
    if (currentLocation && destination) {
      setTripData({
        ...tripData,
        currentLocation: { name: currentLocation },
        locationInfo: { name: destination }
      });
      router.push('/create-trip/select_traveler');
    } else {
      alert('Please fill both fields');
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/travel-bg.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.heading}>Enter Travel Details</Text>

        <Text style={styles.label}>Current Location</Text>
        <TextInput
          style={styles.input}
          placeholder="Where are you now?"
          value={currentLocation}
          onChangeText={setCurrentLocation}
        />

        <Text style={styles.label}>Destination</Text>
        <TextInput
          style={styles.input}
          placeholder="Where do you want to go?"
          value={destination}
          onChangeText={setDestination}
        />

        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    paddingTop: 100,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 30,
    color: '#111827',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 6,
    color: '#374151',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  button: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 15,
    marginTop: 20,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '600',
    fontSize: 20,
  },
});