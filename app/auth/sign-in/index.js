import React, { useEffect, useState } from 'react';
import {
  ImageBackground, View, Text, TextInput, StyleSheet,
  TouchableOpacity, ActivityIndicator, Alert
} from 'react-native';
import { useNavigation } from 'expo-router';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../../configs/FirebaseConfig';

const backGroundImage = require('./../../../assets/images/signin.jpg');

export default function SignIn() {
  const navigation = useNavigation();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  const onSignIn = async () => {
    if (!email || !password) {
      showAlert('Please Enter Email and Password');
      return;
    }

    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await user.reload(); // make sure to get the latest user info

      if (!user.emailVerified) {
        showAlert("Please verify your email before signing in.");
        await signOut(auth);
      } else {
        showAlert("Signed in successfully!");
        router.replace('/mytrip');
      }
    } catch (error) {
      console.log(error.message, error.code);
      if (error.code === 'auth/invalid-login-credentials') {
        showAlert("Invalid Credentials");
      } else {
        showAlert("Sign-in Error: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      showAlert('Please enter your email address first.');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      showAlert('Password reset email sent!');
    } catch (error) {
      console.log(error.message);
      showAlert("Error: " + error.message);
    }
  };

  // Custom alert to show error or info messages
  const showAlert = (message) => {
    Alert.alert('Notification', message, [{ text: 'OK' }]);
  };

  return (
    <ImageBackground source={backGroundImage} resizeMode="cover" style={styles.background}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back-circle" size={30} color="black" />
        </TouchableOpacity>

        <Text style={styles.title}>Let's Sign You In</Text>
        <Text style={styles.subtitle}>Welcome Back</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            placeholder="Enter Email"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            secureTextEntry
            style={styles.input}
            onChangeText={setPassword}
            placeholder="Enter Password"
          />
        </View>

        <TouchableOpacity onPress={onSignIn} style={styles.buttonContainer}>
          {loading ? <ActivityIndicator color="white" /> : <Text style={styles.buttonText}>Sign In</Text>}
        </TouchableOpacity>

        <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotPasswordButton}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.replace('auth/sign-up')} style={styles.createAccountButton}>
          <Text style={styles.createAccountButtonText}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    padding: 25,
    paddingTop: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.47)',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 60,
  },
  subtitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#7d7d7d',
    marginTop: 10,
  },
  inputContainer: {
    marginTop: 50,
  },
  label: {
    fontSize: 20,
  },
  input: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: '#7d7d7d',
    backgroundColor: 'white',
  },
  buttonContainer: {
    padding: 20,
    backgroundColor: 'black',
    borderRadius: 15,
    marginTop: 50,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  forgotPasswordButton: {
    marginTop: 15,
    alignItems: 'center',
  },
  forgotPasswordText: {
    color: '#007bff',
    textDecorationLine: 'underline',
  },
  createAccountButton: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    marginTop: 30,
    borderWidth: 1,
  },
  createAccountButtonText: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});