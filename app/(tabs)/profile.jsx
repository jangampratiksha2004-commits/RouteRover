import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { auth, db } from '../../configs/FirebaseConfig';
import { updateProfile } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useRouter } from 'expo-router';

export default function ProfilePage() {
  const user = auth.currentUser;
  const router = useRouter();
  const [userPhoto, setUserPhoto] = useState(null);
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    if (user?.photoURL) {
      setUserPhoto(user.photoURL);
    }

    if (user?.email) {
      fetchRecentTrips();
    }
  }, [user]);

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission required', 'Please grant media access to change profile photo.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;

      try {
        await updateProfile(user, { photoURL: uri });
        setUserPhoto(uri);
        Alert.alert('Success', 'Profile photo updated.');
      } catch (error) {
        Alert.alert('Error', 'Failed to update profile photo.');
      }
    }
  };

  const fetchRecentTrips = async () => {
    try {
      const q = query(collection(db, 'UserTrips'), where('userEmail', '==', user.email));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => doc.data());
      setTrips(data.reverse());
    } catch (err) {
      console.error('Error fetching trips:', err);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.replace('/mytrip')}>
          <Ionicons name="arrow-back" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={{ width: 30 }} />
      </View>

      {/* Profile Info */}
      <View style={styles.profileContainer}>
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: userPhoto || 'https://via.placeholder.com/100' }}
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.editIcon} onPress={pickImage}>
            <MaterialIcons name="edit" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.name}>{user?.displayName || 'User Name'}</Text>
        <Text style={styles.email}>{user?.email || 'No email provided'}</Text>
      </View>

      {/* Recent Trips */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Trips</Text>
        {trips.length === 0 ? (
          <Text style={styles.sectionText}>No trips yet.</Text>
        ) : (
          trips.slice(0, 2).map((trip, index) => {
            let locationName = 'Unnamed Trip';
            try {
              const tripData =
                typeof trip.tripData === 'string' ? JSON.parse(trip.tripData) : trip.tripData;
              locationName = tripData?.locationInfo?.name || trip.city || 'Unnamed Trip';
            } catch {}
            return (
              <Text key={index} style={styles.sectionText}>
                📍 {locationName}
              </Text>
            );
          })
        )}
        <TouchableOpacity onPress={() => router.push('/mytrip')}>
          <Text style={styles.viewAll}>View All Trips →</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: 55,
    paddingHorizontal: 25,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  imageWrapper: {
    position: 'relative',
    marginBottom: 12,
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: '#2563eb',
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: -4,
    backgroundColor: '#2563eb',
    borderRadius: 10,
    padding: 4,
    elevation: 4,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1f2937',
    marginTop: 4,
  },
  email: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  viewAll: {
    fontSize: 14,
    color: '#2563eb',
    marginTop: 6,
  },
});
