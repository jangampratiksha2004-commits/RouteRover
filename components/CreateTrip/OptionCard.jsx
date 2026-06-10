import { View, Text } from 'react-native'
import React from 'react'

export default function OptionCard({option,selectedTraveler}) {
  return (
    <View style={[{
      padding:25,
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-between',
      backgroundColor:'#D3D3D3',
      borderRadius:15
    },selectedTraveler?.id==option?.id&&{borderWidth:2}]}>
      <View>
        <Text style={{
          fontSize:20,
        }}>
         {option?.title}
        </Text>

        <Text style={{
          fontSize:17,
          color: '#7d7d7d'
        }}>
          {option?.desc}
        </Text>
      </View>
      <Text style={{
        fontSize:35
      }}>
        {option?.icon}
      </Text>
      
    </View>
  )
}