import { View, Text } from 'react-native';
import React from 'react';

export default function DaySchedule({ schedule }) {
  if (!Array.isArray(schedule) || schedule.length === 0) return null;

  return (
    <View style={{ marginTop: 12 }}>
      <Text style={{ fontSize: 14, fontWeight: '800', color: '#374151', marginBottom: 10 }}>
        🕐 Schedule
      </Text>
      {schedule.map((item, i) => (
        <View key={i} style={{ flexDirection: 'row', marginBottom: 12 }}>
          {/* Time + line */}
          <View style={{ alignItems: 'center', width: 60, marginRight: 10 }}>
            <Text style={{ fontSize: 11, fontWeight: '800', color: '#2563eb', textAlign: 'center' }}>
              {item.time}
            </Text>
            <View style={{
              width: 10, height: 10, borderRadius: 5,
              backgroundColor: '#2563eb', marginTop: 4,
            }} />
            {i < schedule.length - 1 && (
              <View style={{ width: 2, flex: 1, backgroundColor: '#e5e7eb', marginTop: 2, minHeight: 20 }} />
            )}
          </View>

          {/* Content */}
          <View style={{
            flex: 1, backgroundColor: '#f8fafc', borderRadius: 10, padding: 10,
            borderLeftWidth: 3, borderLeftColor: '#2563eb', marginBottom: 2,
          }}>
            <Text style={{ fontSize: 14, fontWeight: '700', color: '#111827' }}>
              {item.activity || item.name}
            </Text>
            {item.duration ? (
              <Text style={{ fontSize: 12, color: '#6b7280', marginTop: 2 }}>⏱️ {item.duration}</Text>
            ) : null}
            {item.transport ? (
              <View style={{
                flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
                backgroundColor: '#eff6ff', borderRadius: 6, padding: 6, marginTop: 6,
              }}>
                <Text style={{ fontSize: 12, color: '#1d4ed8', flex: 1 }}>🚌 {item.transport}</Text>
                {item.transportCost ? (
                  <Text style={{ fontSize: 12, color: '#1d4ed8', fontWeight: '700' }}>{item.transportCost}</Text>
                ) : null}
              </View>
            ) : null}
          </View>
        </View>
      ))}
    </View>
  );
}
