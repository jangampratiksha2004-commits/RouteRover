import { View, Text, TouchableOpacity } from 'react-native'
import React ,{useState} from 'react'
import { Ionicons } from '@expo/vector-icons';
import { router} from 'expo-router';

export default function StartNewTripCard() {
  return (
    <View style={{
      padding:20,
      marginTop:50,
      display:'flex',
      alignItems:'center',
      gap:25,
    }}>
      <Ionicons name="location-sharp" size={30} color="black" />

      <Text style={{
        fontSize:25,
        fontWeight:'900'
      }}>
        No Trips Planned yet
      </Text>

      <Text style={{
        fontSize:20,
        fontWeight:'condensed',
        textAlign:'center',
        color:'#7d7d7d'

      }}>
        Looks like its time to plan a new travel experience ! Get Started below
      </Text>

      <TouchableOpacity onPress={()=>router.push('/create-trip/search-place')}
      style={{
        padding:15,
        backgroundColor:'black',
        borderRadius:15,
        paddingHorizontal:30
      }}>
        <Text style={{
          color:'#fff',
          fontWeight:'condensed',
          fontSize:17
        }}>Start a new Trip</Text>
      </TouchableOpacity>
    </View>
  )
}