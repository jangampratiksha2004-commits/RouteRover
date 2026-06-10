import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { GetExactPlaceImage } from '../../services/GooglePlaceApi';
import { getFallbackImage } from '../../services/FallbackImages';
import { extractLocationContext } from '../../utils/LocationUtils';

const openInMaps = (name, coordinates) => {
  const url = coordinates?.latitude && coordinates?.longitude
    ? `https://www.google.com/maps/search/?api=1&query=${coordinates.latitude},${coordinates.longitude}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name || '')}`;
  Linking.openURL(url);
};

export default function PlannedTrip({ details, tripData = null }) {
  const router = useRouter();
  const [photoUrls, setPhotoUrls] = useState({});

  const itineraryEntries = Array.isArray(details)
    ? details.map((d, i) => [String(i), d])
    : Object.entries(details || {});

  useEffect(() => {
    const fetchPhotos = async () => {
      const urls = {};
      const locationContext = extractLocationContext(tripData) || { city: 'Pune', state: 'Maharashtra', country: 'India' };

      for (const [, dayDetails] of itineraryEntries) {
        const stops = dayDetails.travelStops || dayDetails.places || [];
        for (const stop of stops) {
          const name = stop.name;
          if (!name || urls[name]) continue;
          const isVisit = !stop.type || stop.type?.toLowerCase().includes('visit') || stop.type?.toLowerCase().includes('activity');
          if (!isVisit) continue;
          urls[name] = getFallbackImage(name);
          const url = await GetExactPlaceImage(name, locationContext);
          if (url) urls[name] = url;
        }
      }
      setPhotoUrls(urls);
    };
    if (itineraryEntries.length > 0) fetchPhotos();
  }, [details]);

  return (
    <View style={{ marginTop: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: '900' }}>📝 Plan Details</Text>

      {itineraryEntries.map(([key, dayDetails], index) => {
        const stops = dayDetails.travelStops || [];
        const legacyPlaces = dayDetails.places || [];

        return (
          <View key={key}>
            {/* Day Header */}
            <Text style={{ fontSize: 17, fontWeight: '600', marginTop: 20, marginBottom: 5 }}>
              Day {dayDetails.day || index + 1} — {dayDetails.title}
            </Text>

            {dayDetails.theme ? (
              <Text style={{ fontSize: 13, color: '#808080', marginBottom: 5 }}>
                🗂 {dayDetails.theme}
              </Text>
            ) : null}

            {dayDetails.description ? (
              <Text style={{ fontSize: 15, color: 'gray', marginBottom: 10 }}>
                {dayDetails.description}
              </Text>
            ) : null}

            {dayDetails.estimatedDayCost ? (
              <Text style={{ fontSize: 14, color: '#808080', marginBottom: 10 }}>
                💰 Est. Cost: {dayDetails.estimatedDayCost}
              </Text>
            ) : null}

            {/* Travel Stops */}
            {stops.length > 0 && (
              <View style={{ marginTop: 5 }}>
                {stops.map((stop, idx) => {
                  const isVisit = stop.type?.toLowerCase().includes('visit') || stop.type?.toLowerCase().includes('activity');
                  return (
                    <View key={`${stop.name}-${idx}`} style={{ flexDirection: 'row', marginBottom: 14 }}>

                      {/* Timeline */}
                      <View style={{ alignItems: 'center', marginRight: 12, width: 55 }}>
                        <Text style={{ fontSize: 11, fontWeight: '600', color: '#808080', textAlign: 'center' }}>
                          {stop.time}
                        </Text>
                        <View style={{
                          width: 10, height: 10, borderRadius: 5,
                          backgroundColor: 'black', marginTop: 4,
                        }} />
                        {idx < stops.length - 1 && (
                          <View style={{ width: 1, flex: 1, backgroundColor: '#D3D3D3', marginTop: 2, minHeight: 20 }} />
                        )}
                      </View>

                      {/* Stop Content */}
                      <TouchableOpacity
                        style={{
                          flex: 1,
                          borderWidth: 1,
                          borderColor: '#D3D3D3',
                          borderRadius: 15,
                          padding: 10,
                          backgroundColor: '#fff',
                        }}
                        activeOpacity={isVisit ? 0.7 : 1}
                        onPress={() => {
                          if (isVisit) {
                            router.push({
                              pathname: '/place-details',
                              params: {
                                place: JSON.stringify({
                                  name: stop.name,
                                  details: stop.details,
                                  coordinates: stop.coordinates,
                                  ticketPricing: stop.ticketPrice,
                                  timeToVisit: stop.duration,
                                  bestTime: stop.bestTime,
                                })
                              }
                            });
                          }
                        }}
                      >
                        {/* Image for Visit/Activity */}
                        {isVisit && photoUrls[stop.name] && (
                          <Image
                            source={{ uri: photoUrls[stop.name] }}
                            style={{ width: '100%', height: 200, borderRadius: 15 }}
                            onError={() =>
                              setPhotoUrls(prev => ({ ...prev, [stop.name]: getFallbackImage(stop.name) }))
                            }
                          />
                        )}

                        <View style={{ marginTop: isVisit ? 8 : 0 }}>
                          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ fontSize: 16, fontWeight: '900', flex: 1 }}>{stop.name}</Text>
                            {stop.type ? (
                              <Text style={{ fontSize: 12, color: '#808080' }}>{stop.type}</Text>
                            ) : null}
                          </View>

                          {stop.details ? (
                            <Text style={{ fontSize: 14, color: 'gray', marginTop: 3 }}>{stop.details}</Text>
                          ) : null}

                          <View style={{ marginTop: 5 }}>
                            {stop.duration ? (
                              <Text style={{ fontSize: 13, color: '#808080' }}>⏱️ {stop.duration}</Text>
                            ) : null}
                            {stop.ticketPrice ? (
                              <Text style={{ fontSize: 13, marginTop: 3, fontWeight: '500' }}>
                                🎫 Ticket: {stop.ticketPrice}
                              </Text>
                            ) : null}
                            {stop.bestTime ? (
                              <Text style={{ fontSize: 13, color: '#808080', marginTop: 3 }}>
                                ☀️ Best Time: {stop.bestTime}
                              </Text>
                            ) : null}
                            {stop.transport ? (
                              <Text style={{ fontSize: 13, color: '#808080', marginTop: 3 }}>
                                🚌 {stop.transport}
                                {stop.transportCost ? `  •  ${stop.transportCost}` : ''}
                              </Text>
                            ) : null}
                            {stop.tip ? (
                              <Text style={{ fontSize: 13, color: '#808080', marginTop: 3 }}>
                                💡 {stop.tip}
                              </Text>
                            ) : null}
                          </View>

                          {isVisit && (
                            <TouchableOpacity
                              style={{
                                backgroundColor: '#4285F4',
                                padding: 8,
                                borderRadius: 7,
                                alignSelf: 'flex-end',
                                marginTop: 8,
                              }}
                              onPress={() => openInMaps(stop.name, stop.coordinates)}
                            >
                              <Ionicons name="map" size={20} color="white" />
                            </TouchableOpacity>
                          )}
                        </View>
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </View>
            )}

            {/* Fallback: legacy places array */}
            {stops.length === 0 && legacyPlaces.length > 0 && legacyPlaces.map((place, idx) => (
              <TouchableOpacity
                key={`${place.name}-${idx}`}
                style={{
                  backgroundColor: '#f2f2fe',
                  borderWidth: 1,
                  padding: 10,
                  borderRadius: 15,
                  borderColor: 'gray',
                  marginTop: 20,
                }}
                onPress={() => router.push({ pathname: '/place-details', params: { place: JSON.stringify(place) } })}
                activeOpacity={0.7}
              >
                <Image
                  source={{ uri: photoUrls[place.name] || getFallbackImage(place.name) }}
                  style={{ width: '100%', height: 200, borderRadius: 15 }}
                  onError={() => setPhotoUrls(prev => ({ ...prev, [place.name]: getFallbackImage(place.name) }))}
                />
                <View style={{ marginTop: 5 }}>
                  <Text style={{ fontSize: 17, fontWeight: '900', marginBottom: 5 }}>{place.name}</Text>
                  <Text style={{ fontSize: 16, color: 'gray' }}>{place.details}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 5 }}>
                    <View>
                      <Text style={{ fontSize: 14, fontWeight: '500' }}>
                        🎫 Ticket Price: <Text style={{ fontWeight: '900' }}>{place.ticketPricing}</Text>
                      </Text>
                      <Text style={{ fontSize: 14, marginTop: 5 }}>🕒 Time to Visit: {place.timeToVisit}</Text>
                    </View>
                    <TouchableOpacity
                      style={{ backgroundColor: '#4285F4', padding: 8, borderRadius: 7 }}
                      onPress={() => openInMaps(place.name, place.coordinates)}
                    >
                      <Ionicons name="map" size={20} color="white" />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            ))}

            {/* Meals */}
            {dayDetails.meals && (
              <View style={{
                borderWidth: 1, borderColor: '#D3D3D3',
                borderRadius: 15, padding: 12, marginTop: 15,
              }}>
                <Text style={{ fontWeight: '700', fontSize: 16, marginBottom: 8 }}>🍽️ Meals</Text>
                {dayDetails.meals.breakfast ? (
                  <Text style={{ fontSize: 14, color: 'gray' }}>🌅 Breakfast: {dayDetails.meals.breakfast}</Text>
                ) : null}
                {dayDetails.meals.lunch ? (
                  <Text style={{ fontSize: 14, color: 'gray', marginTop: 4 }}>☀️ Lunch: {dayDetails.meals.lunch}</Text>
                ) : null}
                {dayDetails.meals.dinner ? (
                  <Text style={{ fontSize: 14, color: 'gray', marginTop: 4 }}>🌙 Dinner: {dayDetails.meals.dinner}</Text>
                ) : null}
              </View>
            )}

            {dayDetails.dayTip ? (
              <Text style={{ fontSize: 13, color: '#808080', marginTop: 10, fontStyle: 'italic' }}>
                💡 Tip: {dayDetails.dayTip}
              </Text>
            ) : null}

          </View>
        );
      })}
    </View>
  );
}
