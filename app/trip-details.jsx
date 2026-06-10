import { View, Text, Image, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import moment from 'moment';
import FlightInfo from '../components/TripDetails/FlightInfo';
import HotelList from '../components/TripDetails/HotelList';
import PlannedTrip from '../components/TripDetails/PlannedTrip';
import TransportInfo from '../components/TripDetails/TransportInfo';


export default function TripDetails(tripData) {
  const navigation = useNavigation();
  const { trip } = useLocalSearchParams();
  const [tripDetails, setTripDetails] = useState(null);
  const [imageError, setImageError] = useState(false);
  
  const formatData = (data) => {
    try {
      return JSON.parse(data);
    } catch (error) {
      console.log('JSON Parse Error:', error);
      return null;
    }
  };



  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: '',
    });
    
    try {
      console.log('Raw trip data:', trip);
      const parsedTrip = JSON.parse(trip);
      console.log('Parsed trip:', parsedTrip);
      setTripDetails(parsedTrip);
    } catch (error) {
      console.log('Error parsing trip data:', error);
      console.log('Trip data type:', typeof trip);
      console.log('Trip data content:', trip);
    }
  }, []);

  useEffect(() => {
    if (tripDetails) {
      console.log('Trip Details:', tripDetails);
    }
  }, [tripDetails]);

  // Debug logging - only if tripDetails exists
  let photoRef, apiKey, photoUri;
  if (tripDetails) {
    const tripData = formatData(tripDetails?.tripData);
    photoRef = tripData?.locationInfo?.photoRef;
    apiKey = process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY;
    photoUri = photoRef ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photoRef}&key=${apiKey}` : null;
    
    console.log('=== DEBUG INFO ===');
    console.log('Photo Ref:', photoRef);
    console.log('API Key:', apiKey);
    console.log('Full URI:', photoUri);
  }

  return tripDetails && (
    <ScrollView>
      <Image 
        source={imageError || !photoRef ? 
          require('../assets/images/travel-bg.jpg') : 
          {uri: photoUri}
        }
        defaultSource={require('../assets/images/travel-bg.jpg')}
        style={{
          width: '100%',
          height: 260,
          objectFit: 'cover',
          borderRadius: 15
        }}
        onError={(error) => {
          console.log('❌ Image Error:', error.nativeEvent.error);
          setImageError(true);
        }}
        onLoad={() => {
          console.log('✅ Image loaded successfully');
        }}
      />
      <View
        style={{
          padding: 15,
          backgroundColor: '#fff',
          height: '100%',
          marginTop: -20,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}
      >
        <Text
          style={{
            fontSize: 25,
            fontWeight: '900',
          }}
        >
          {formatData(tripDetails.tripData)?.locationInfo?.name || formatData(tripDetails.tripData)?.destination}

        </Text>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 5,
            marginTop: 5,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              color: '#808080',
            }}
          >
            {moment(formatData(tripDetails.tripData).startDate).format('DD MMM yyyy')}
          </Text>

          <Text
            style={{
              fontSize: 18,
              color: '#808080',
            }}
          >
            -{moment(formatData(tripDetails.tripData).endDate).format('DD MMM yyyy')}
          </Text>
        </View>
        <Text
          style={{
            fontSize: 17,
            color:'gray'
          }}
        >
          🚌 {formatData(tripDetails.tripData)?.traveler?.title}
        </Text>

        {/* Transport / Flight Info */}
        {tripDetails?.tripPlan?.tripDetails?.transportDetails ? (
          <TransportInfo
            transportDetails={tripDetails.tripPlan.tripDetails.transportDetails}
            travelRoute={tripDetails.tripPlan.tripDetails.travelRoute}
            localTransport={tripDetails.tripPlan.tripDetails.localTransport}
            middleSpots={tripDetails.tripPlan.tripDetails.middleSpots}
          />
        ) : (
          <FlightInfo flightData={tripDetails?.tripPlan?.tripDetails?.flightDetails} />
        )}

        {/* Hotel List */}
        <HotelList hotelList ={tripDetails?.tripPlan?.tripDetails?.hotelOptions}/>

        {/* Trip Day Planner Info */}
        <PlannedTrip details={tripDetails?.tripPlan?.tripDetails?.itinerary}/>
      </View>

      
    </ScrollView>
  );
}