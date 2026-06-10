import { View, Text, TouchableOpacity, Linking } from 'react-native';
import React, { useState } from 'react';

const modeIcon = {
  flight: '✈️', train: '🚆', bus: '🚌', car: '🚗',
  self: '🚙', cab: '🚕', auto: '🛺', walk: '🚶', metro: '🚇',
};

const categoryIcon = {
  viewpoint: '🏔️', temple: '🛕', 'food stop': '🍽️', waterfall: '💧',
  fort: '🏰', market: '🛍️', beach: '🏖️', lake: '🌊', default: '📍',
};

const getModeIcon = (mode = '') => {
  const key = mode.toLowerCase();
  for (const [k, v] of Object.entries(modeIcon)) {
    if (key.includes(k)) return v;
  }
  return '🚌';
};

const getCategoryIcon = (category = '') => {
  const key = category.toLowerCase();
  for (const [k, v] of Object.entries(categoryIcon)) {
    if (key.includes(k)) return v;
  }
  return categoryIcon.default;
};

const openInMaps = (name, coordinates) => {
  const url = coordinates?.latitude && coordinates?.longitude
    ? `https://www.google.com/maps/search/?api=1&query=${coordinates.latitude},${coordinates.longitude}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name)}`;
  Linking.openURL(url);
};

export default function TransportInfo({ transportDetails, travelRoute, localTransport, middleSpots }) {
  const [showRoute, setShowRoute] = useState(false);
  const [showLocal, setShowLocal] = useState(false);
  const [showMiddle, setShowMiddle] = useState(true);

  const isSelfCar = transportDetails?.mode?.toLowerCase().includes('self') ||
    transportDetails?.mode?.toLowerCase().includes('personal');

  if (!transportDetails && !travelRoute) return null;

  return (
    <View style={{ marginTop: 20 }}>

      {/* Main Transport Card */}
      {transportDetails && (
        <View style={{
          borderWidth: 1, borderColor: '#D3D3D3',
          borderRadius: 15, padding: 15, marginBottom: 12,
        }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ fontWeight: '900', fontSize: 20 }}>
              {getModeIcon(transportDetails.mode)} {transportDetails.mode} Details
            </Text>
            {transportDetails.bookingUrl ? (
              <TouchableOpacity
                onPress={() => Linking.openURL(transportDetails.bookingUrl)}
                style={{ backgroundColor: '#1E90ff', padding: 6, borderRadius: 8 }}
              >
                <Text style={{ color: '#fff', fontSize: 13, fontWeight: '600' }}>Book</Text>
              </TouchableOpacity>
            ) : null}
          </View>

          <Text style={{ fontSize: 15, color: 'gray', marginTop: 8 }}>
            🏢 {transportDetails.provider}
          </Text>
          <View style={{ flexDirection: 'row', gap: 20, marginTop: 6 }}>
            <Text style={{ fontSize: 14, color: 'gray' }}>🕐 Depart: {transportDetails.departureTime}</Text>
            <Text style={{ fontSize: 14, color: 'gray' }}>🕓 Arrive: {transportDetails.arrivalTime}</Text>
          </View>
          <Text style={{ fontSize: 15, color: '#111', fontWeight: '600', marginTop: 6 }}>
            💰 {transportDetails.price}
          </Text>

          {/* Self-car specific info */}
          {isSelfCar && (transportDetails.fuelCost || transportDetails.tollCost) && (
            <View style={{
              flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 10,
            }}>
              {transportDetails.fuelCost ? (
                <View style={{ backgroundColor: '#fef3c7', borderRadius: 8, padding: 8 }}>
                  <Text style={{ fontSize: 13, color: '#92400e', fontWeight: '600' }}>
                    ⛽ Fuel: {transportDetails.fuelCost}
                  </Text>
                </View>
              ) : null}
              {transportDetails.tollCost ? (
                <View style={{ backgroundColor: '#fef3c7', borderRadius: 8, padding: 8 }}>
                  <Text style={{ fontSize: 13, color: '#92400e', fontWeight: '600' }}>
                    🛣️ Toll: {transportDetails.tollCost}
                  </Text>
                </View>
              ) : null}
            </View>
          )}
          {isSelfCar && transportDetails.parkingTips ? (
            <View style={{
              backgroundColor: '#eff6ff', borderRadius: 8,
              padding: 10, marginTop: 8, borderLeftWidth: 3, borderLeftColor: '#3b82f6',
            }}>
              <Text style={{ fontSize: 13, color: '#1e40af' }}>🅿️ {transportDetails.parkingTips}</Text>
            </View>
          ) : null}

          {transportDetails.tips ? (
            <View style={{
              backgroundColor: '#fffbeb', borderRadius: 8,
              padding: 10, marginTop: 8, borderLeftWidth: 3, borderLeftColor: '#f59e0b',
            }}>
              <Text style={{ fontSize: 13, color: '#92400e' }}>💡 {transportDetails.tips}</Text>
            </View>
          ) : null}
        </View>
      )}

      {/* En-Route Middle Spots */}
      {Array.isArray(middleSpots) && middleSpots.length > 0 && (
        <View style={{
          borderWidth: 1, borderColor: '#D3D3D3',
          borderRadius: 15, padding: 15, marginBottom: 12,
        }}>
          <TouchableOpacity
            onPress={() => setShowMiddle(!showMiddle)}
            style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <View>
              <Text style={{ fontWeight: '900', fontSize: 20 }}>🛑 En-Route Stops</Text>
              <Text style={{ fontSize: 13, color: 'gray', marginTop: 2 }}>
                {middleSpots.length} spots between origin & destination
              </Text>
            </View>
            <Text style={{ fontSize: 20 }}>{showMiddle ? '▲' : '▼'}</Text>
          </TouchableOpacity>

          {showMiddle && middleSpots.map((spot, i) => (
            <View key={i} style={{ marginTop: 14 }}>
              {/* Connector line */}
              <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                <View style={{ alignItems: 'center', marginRight: 12 }}>
                  <View style={{
                    width: 36, height: 36, borderRadius: 18,
                    backgroundColor: '#111827', justifyContent: 'center', alignItems: 'center',
                  }}>
                    <Text style={{ fontSize: 16 }}>{getCategoryIcon(spot.category)}</Text>
                  </View>
                  {i < middleSpots.length - 1 && (
                    <View style={{ width: 2, height: 40, backgroundColor: '#d1d5db', marginTop: 2 }} />
                  )}
                </View>

                <View style={{
                  flex: 1, backgroundColor: '#f9fafb',
                  borderRadius: 12, padding: 12,
                  borderLeftWidth: 3, borderLeftColor: '#111827',
                }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontSize: 15, fontWeight: '800', color: '#111827' }}>{spot.name}</Text>
                      <Text style={{ fontSize: 12, color: '#6b7280', marginTop: 2 }}>{spot.category}</Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => openInMaps(spot.name, spot.coordinates)}
                      style={{ backgroundColor: '#4285F4', padding: 6, borderRadius: 7, marginLeft: 8 }}
                    >
                      <Text style={{ color: '#fff', fontSize: 11, fontWeight: '600' }}>Maps</Text>
                    </TouchableOpacity>
                  </View>

                  <Text style={{ fontSize: 13, color: '#374151', marginTop: 6 }}>{spot.description}</Text>

                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
                    {spot.distanceFromOrigin ? (
                      <View style={{ backgroundColor: '#e0f2fe', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 4 }}>
                        <Text style={{ fontSize: 12, color: '#0369a1' }}>📍 {spot.distanceFromOrigin}</Text>
                      </View>
                    ) : null}
                    {spot.distanceFromDestination ? (
                      <View style={{ backgroundColor: '#dcfce7', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 4 }}>
                        <Text style={{ fontSize: 12, color: '#15803d' }}>🏁 {spot.distanceFromDestination}</Text>
                      </View>
                    ) : null}
                    {spot.stopDuration ? (
                      <View style={{ backgroundColor: '#fef9c3', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 4 }}>
                        <Text style={{ fontSize: 12, color: '#854d0e' }}>⏱️ Stop: {spot.stopDuration}</Text>
                      </View>
                    ) : null}
                  </View>

                  {spot.bestFor ? (
                    <Text style={{ fontSize: 12, color: '#7c3aed', marginTop: 6 }}>
                      ✨ Best for: {spot.bestFor}
                    </Text>
                  ) : null}
                  {spot.tip ? (
                    <Text style={{ fontSize: 12, color: '#92400e', marginTop: 4 }}>
                      💡 {spot.tip}
                    </Text>
                  ) : null}
                </View>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Travel Route */}
      {travelRoute && (
        <View style={{
          borderWidth: 1, borderColor: '#D3D3D3',
          borderRadius: 15, padding: 15, marginBottom: 12,
        }}>
          <TouchableOpacity
            onPress={() => setShowRoute(!showRoute)}
            style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <Text style={{ fontWeight: '900', fontSize: 20 }}>🗺️ Travel Route</Text>
            <Text style={{ fontSize: 20 }}>{showRoute ? '▲' : '▼'}</Text>
          </TouchableOpacity>

          <Text style={{ fontSize: 14, color: 'gray', marginTop: 6 }}>{travelRoute.summary}</Text>
          <View style={{ flexDirection: 'row', gap: 16, marginTop: 4 }}>
            <Text style={{ fontSize: 13, color: '#6b7280' }}>📏 {travelRoute.totalDistance}</Text>
            <Text style={{ fontSize: 13, color: '#6b7280' }}>⏱️ {travelRoute.totalDuration}</Text>
          </View>

          {showRoute && Array.isArray(travelRoute.steps) && travelRoute.steps.map((step, i) => (
            <View key={i} style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: 12, paddingLeft: 8 }}>
              <View style={{ alignItems: 'center', marginRight: 12 }}>
                <View style={{
                  width: 28, height: 28, borderRadius: 14,
                  backgroundColor: '#111827', justifyContent: 'center', alignItems: 'center',
                }}>
                  <Text style={{ color: '#fff', fontSize: 12, fontWeight: '700' }}>{i + 1}</Text>
                </View>
                {i < travelRoute.steps.length - 1 && (
                  <View style={{ width: 2, height: 30, backgroundColor: '#d1d5db', marginTop: 2 }} />
                )}
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 14, fontWeight: '600', color: '#111' }}>
                  {getModeIcon(step.mode)} {step.step}
                </Text>
                <Text style={{ fontSize: 13, color: '#6b7280', marginTop: 2 }}>
                  ⏱️ {step.duration}  💰 {step.cost}
                </Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Local Transport Options */}
      {Array.isArray(localTransport) && localTransport.length > 0 && (
        <View style={{
          borderWidth: 1, borderColor: '#D3D3D3',
          borderRadius: 15, padding: 15, marginBottom: 12,
        }}>
          <TouchableOpacity
            onPress={() => setShowLocal(!showLocal)}
            style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <Text style={{ fontWeight: '900', fontSize: 20 }}>🏙️ Local Transport</Text>
            <Text style={{ fontSize: 20 }}>{showLocal ? '▲' : '▼'}</Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 13, color: 'gray', marginTop: 4 }}>Options available at destination</Text>

          {showLocal && localTransport.map((t, i) => (
            <View key={i} style={{
              flexDirection: 'row', alignItems: 'center',
              backgroundColor: '#f9fafb', borderRadius: 10,
              padding: 12, marginTop: 10,
            }}>
              <Text style={{ fontSize: 26, marginRight: 12 }}>{getModeIcon(t.mode)}</Text>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 15, fontWeight: '700' }}>{t.mode}</Text>
                <Text style={{ fontSize: 13, color: '#6b7280' }}>{t.use}</Text>
                <Text style={{ fontSize: 13, color: '#374151', marginTop: 2 }}>Avg: {t.avgCost}</Text>
              </View>
              {t.appLink ? (
                <TouchableOpacity
                  onPress={() => Linking.openURL(t.appLink)}
                  style={{ backgroundColor: '#111827', padding: 7, borderRadius: 8 }}
                >
                  <Text style={{ color: '#fff', fontSize: 12 }}>Open</Text>
                </TouchableOpacity>
              ) : null}
            </View>
          ))}
        </View>
      )}
    </View>
  );
}
