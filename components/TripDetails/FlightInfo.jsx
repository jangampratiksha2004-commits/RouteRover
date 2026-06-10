import { View, Text,Linking,TouchableOpacity} from 'react-native'
import React from 'react'

export default function FlightInfo({flightData}) {

  const handlePress = (url) => {
    Linking.openURL(url);
  };

  return (
    <View style={{
      marginTop:20,
      borderWidth:1,
      borderColor:'#D3D3D3',
      padding:10,
      borderRadius:15,
    }}>
      <View style={{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
      }}>
      <Text style={{
        fontWeight:'900',
        fontSize:20
      }}>✈️ Flight Details</Text>

      <TouchableOpacity onPress={() => handlePress(flightData.bookingUrl)}style={{
        backgroundColor:'#1E90ff',
        padding:5,
        width:100,
        marginTop:5,
        borderRadius:5
      }}>
        <Text style={{
          textAlign:'center',
          color:'white',
        }}>Book Here</Text>

      </TouchableOpacity>
      </View>
      

      <Text style={{
        fontSize:16,
        color:'gray',
        marginTop:5
      }}>AirLine: {flightData.airline}</Text>
      <Text style={{
        fontSize:16,
        color:'gray'
      }}>Price: {flightData.price}</Text>
      
         
    </View>
  )
}