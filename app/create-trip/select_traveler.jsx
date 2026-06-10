import { View, Text, FlatList,TouchableOpacity,Link} from 'react-native'
import React, {useContext,useEffect,useState } from 'react'
import { useNavigation } from 'expo-router'
import {SelectTrvelersList} from './../../constants/Options'
import OptionCard from './../../components/CreateTrip/OptionCard'
import { CreateTripContext } from '../../context/CreateTripContext'
import { router} from 'expo-router';

export default function SelectTraveler(){
  const navigation=useNavigation();
  const [selectedTraveler,setSelectedTraveler]=useState();
  const{tripData,setTripData}=useContext(CreateTripContext);
  useEffect(()=>{
        navigation.setOptions({
          headerShown:true,
          headerTransparent:true,
          headerTitle:''
        })
      },[])

  useEffect(()=>{
    setTripData({...tripData,traveler:selectedTraveler})
  },[selectedTraveler])

  useEffect
  return(
    <View style={{
            padding:25,
            paddingTop:75,
            backgroundColor:'#fff',
            height:'100%'
          }}> 
      <Text style={{
        fontSize:35,
        fontWeight:'900',
        marginTop:20
      }}>Who is Traveling</Text>

      <View style={{
        marginTop:20
      }}>
        <Text style={{
          fontSize:23,
          fontWeight:'bold'
        }}>Choose your Travelers</Text>

        <FlatList
            data={SelectTrvelersList}
            renderItem={({ item,index}) => (
            <TouchableOpacity 
            onPress={()=>setSelectedTraveler(item)}
            style={{
              marginVertical:10
            }}>
              <OptionCard option={item} selectedTraveler={selectedTraveler} />
              </TouchableOpacity>
          )}  
        />

        </View>
        <TouchableOpacity 
  style={{
    padding:15,
    backgroundColor:'black',
    borderRadius:15,
    marginTop:20
  }}
  onPress={() => {
    if (selectedTraveler) {
      router.push('/create-trip/select-dates');
    } else {
      alert('Please select a traveler first');
    }
  }}
>
  <Text style={{
    textAlign:'center',
    color:'white',
    fontSize:20,
    fontWeight:'700'
  }}>Continue</Text>
   </TouchableOpacity>

        
    </View>
    
  )
}
