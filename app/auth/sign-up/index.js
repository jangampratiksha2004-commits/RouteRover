import React, { useEffect, useState } from 'react';
import {
  ImageBackground, View, Text, TextInput, StyleSheet,
  TouchableOpacity, ActivityIndicator, Alert
} from 'react-native';
import { useNavigation } from 'expo-router';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { auth } from '../../../configs/FirebaseConfig';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';

const backGroundImage = require('./../../../assets/images/signin.jpg');

const getFirebaseErrorMessage = (errorCode) => {
  switch (errorCode) {
    case 'auth/invalid-email':
      return 'The email address is not valid.';
    case 'auth/email-already-in-use':
      return 'This email is already associated with another account.';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters long.';
    case 'auth/missing-email':
      return 'Please enter a valid email address.';
    case 'auth/operation-not-allowed':
      return 'Operation not allowed. Please contact support.';
    default:
      return 'An error occurred. Please try again.';
  }
};

export default function SignUp() {
  const navigation = useNavigation();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    navigation.setOptions({ headerShown: false });

    const unsubscribe = onAuthStateChanged(auth, (u) => {
      if (u) setUser(u);
    });

    return unsubscribe;
  }, []);

  const showAlert = (title, message) => {
    Alert.alert(title, message, [{ text: 'OK' }], { cancelable: false });
  };

  const OnCreateAccount = async () => {
    if (!email || !password || !fullName) {
      showAlert("Error", "Please enter all details");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // 👇 Add full name to user profile
      await updateProfile(userCredential.user, { displayName: fullName });

      await sendEmailVerification(userCredential.user);
      setUser(userCredential.user);
      setEmailSent(true);
      showAlert("Success", "Verification email sent. Please verify to continue.");
    } catch (error) {
      const errorMessage = getFirebaseErrorMessage(error.code);
      console.log(error.message);
      showAlert("Error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const resendVerification = async () => {
    if (user) {
      await sendEmailVerification(user);
      showAlert("Success", "Verification email resent.");
    }
  };

  const checkVerification = async () => {
    await user.reload();
    if (user.emailVerified) {
      showAlert("Success", "Email verified!");
      router.replace('/mytrip');
    } else {
      showAlert("Error", "Email not verified yet.");
    }
  };

  return (
    <ImageBackground source={backGroundImage} resizeMode="cover" style={styles.background}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back-circle" size={30} color="black" />
        </TouchableOpacity>

        <Text style={styles.title}>Create New Account</Text>
        <Text style={styles.subtitle}>Join us today!</Text>

        {!emailSent ? (
          <>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput style={styles.input} placeholder="Enter Full Name" onChangeText={setFullName} />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput style={styles.input} placeholder="Enter Email" onChangeText={setEmail} />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <TextInput secureTextEntry style={styles.input} placeholder="Enter Password" onChangeText={setPassword} />
            </View>

            <TouchableOpacity onPress={OnCreateAccount} style={styles.buttonContainer}>
              {loading ? <ActivityIndicator color="white" /> : <Text style={styles.buttonText}>Create Account</Text>}
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={{ fontSize: 16, marginTop: 40, textAlign: 'center' }}>
              A verification email has been sent to {user?.email}. Please verify your email to continue.
            </Text>

            <TouchableOpacity onPress={resendVerification} style={styles.resendButton}>
              <Text style={styles.resendText}>Resend Verification Email</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={checkVerification} style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Check Verification</Text>
            </TouchableOpacity>
          </>
        )}

        <TouchableOpacity onPress={() => router.replace('auth/sign-in')} style={styles.signInButton}>
          <Text style={styles.signInButtonText}>Already have an account? Sign In</Text>
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
    marginTop: 30,
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
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  signInButton: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    marginTop: 30,
    borderWidth: 1,
  },
  signInButtonText: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  resendButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  resendText: {
    color: '#007bff',
    textDecorationLine: 'underline',
  },
});