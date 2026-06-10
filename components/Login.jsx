import React ,{useState} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, StatusBar} from 'react-native';
import { useRouter } from 'expo-router';

export default function Login() {
  const router = useRouter();

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" hidden={false} backgroundColor="transparent" translucent />

      <Image source={require('./../assets/images/one.jpg')} style={styles.image} />

      <View style={styles.container}>
        <Text style={styles.title}>RouteRover</Text>
        <Text style={styles.description}>
          Discover your next adventure effortlessly. Personalized itineraries at your fingertips. Travel smarter with AI-driven insights.
        </Text>

        <TouchableOpacity style={styles.button} onPress={() => router.push('auth/sign-in')}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 500,
    resizeMode:'cover',
  },
  container: {
    backgroundColor: '#fff',
    marginTop: -10,
    height: '100%',
    flex:1,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    padding: 25,
  },
  title: {
    fontSize: 35,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 10,
  },
  description: {
    fontSize: 17,
    textAlign: 'center',
    color: '#7d7d7d',
    marginTop: 20,
  },
  button: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 99,
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
});