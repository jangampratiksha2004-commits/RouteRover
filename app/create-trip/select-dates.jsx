import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ImageBackground,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation, useRouter } from 'expo-router';
import { differenceInDays, addDays } from 'date-fns';
import { CreateTripContext } from '../../context/CreateTripContext';

export default function SelectDates() {
  const navigation = useNavigation();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const [isStart, setIsStart] = useState(true);
  const [totalDays, setTotalDays] = useState(null);

  const { tripData, setTripData } = useContext(CreateTripContext);
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: '',
    });
  }, []);

  const onChange = (event, selectedDate) => {
  if (!selectedDate) {
    setShowPicker(false);
    return;
  }

  if (isStart) {
    setStartDate(selectedDate);
    setEndDate(null);
    setTotalDays(null);
    setIsStart(false);
    setTimeout(() => setShowPicker(true), 300);
  } else {
    if (selectedDate >= startDate) {
      const total = differenceInDays(selectedDate, startDate) + 1;
      setEndDate(selectedDate);
      setTotalDays(total);
      setTripData({
        ...tripData,
        startDate: startDate.toISOString(),
        endDate: selectedDate.toISOString(),
        totalNoOfDays: total,
      });
    }
  }

  setShowPicker(false);
};

  const showDatePicker = (type) => {
    setIsStart(type === 'start');
    setShowPicker(true);
  };

  return (
    <ImageBackground
      source={require('../../assets/images/date-bg.jpg')} // 🔁 Replace with a suitable background image
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Choose Your Travel Dates</Text>

        <View style={styles.card}>
          <TouchableOpacity
            onPress={() => showDatePicker('start')}
            style={styles.dateButton}
          >
            <Text style={styles.dateButtonText}>Start Date</Text>
            <Text style={styles.dateText}>{startDate.toDateString()}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => showDatePicker('end')}
            style={styles.dateButton}
          >
            <Text style={styles.dateButtonText}>End Date</Text>
            <Text style={styles.dateText}>
              {endDate ? endDate.toDateString() : 'Select a date'}
            </Text>
          </TouchableOpacity>
        </View>

        {totalDays && (
          <Text style={styles.totalDays}>Total Days: {totalDays}</Text>
        )}

        {showPicker && (
          <DateTimePicker
          value={isStart ? startDate : (endDate || startDate)}
        mode="date"
        display="default"
       onChange={onChange}
        minimumDate={isStart ? new Date() : startDate}
  // Removed: maximumDate={addDays(startDate, 6)}
/>

        )}

        <TouchableOpacity
          disabled={!startDate || !endDate}
          onPress={() => router.replace('/create-trip/select-budget')}
          style={[
            styles.continueButton,
            { opacity: !startDate || !endDate ? 0.5 : 1 },
          ]}
        >
          <Text style={styles.continueText}>Continue</Text>
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
    paddingTop: 100,
    paddingHorizontal: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.38)',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 40,
  },
  card: {
    backgroundColor: '#f3f4f6',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  dateButton: {
    backgroundColor: '#e5e7eb',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 16,
  },
  dateButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  dateText: {
    fontSize: 16,
    marginTop: 6,
    color: '#4b5563',
  },
  totalDays: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: 20,
    textAlign: 'center',
    color: '#374151',
  },
  continueButton: {
    backgroundColor: '#111827',
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 40,
    alignItems: 'center',
  },
  continueText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});