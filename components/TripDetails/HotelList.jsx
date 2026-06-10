import { View, Text, FlatList } from 'react-native';
import React from 'react';
import HotelCard from './Hotelcard';

export default function HotelList({ hotelList }) {
  return (
    <View style={{ marginTop: 20 }}>
      <Text style={{ fontWeight: '900', fontSize: 20 }}>🏨 Hotel Recommendations</Text>

      <FlatList
        data={hotelList}
        style={{ marginTop: 18 }}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        renderItem={({ item }) => <HotelCard item={item} />}
        keyExtractor={(item, index) => `${item.name}-${index}`}
      />
    </View>
  );
}