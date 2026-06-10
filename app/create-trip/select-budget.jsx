import { View, Text, ToastAndroid,FlatList ,TouchableOpacity} from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import {useNavigation } from 'expo-router'
import { SelectBudgetOptions } from '../../constants/Options';
import OptionCard from './../../components/CreateTrip/OptionCard'
import {CreateTripContext} from '../../context/CreateTripContext'
import { useRouter } from 'expo-router';


export default function SelectBudget() {

    const navigation=useNavigation();
    const [selectedOption,setSelectedTraveler]=useState();
    const {tripData, setTripData}=useContext(CreateTripContext);
    const router=useRouter();

    useEffect(()=>{
        navigation.setOptions({
            headerShown:true,
            headerTransparent:true,
            headerTitle:''
        })
    },[])


    useEffect(()=>{
        selectedOption&&setTripData({
            ...tripData,
            budget:selectedOption?.title
        })
    },[selectedOption])
    

    const onClickContinue=()=>{
        if(!selectedOption){
            ToastAndroid.show('Select Your Budget',ToastAndroid.LONG);
            return;
        }

      router.push('/create-trip/select-transport');
     }
  return (
    <View style={{
        padding:25,
        paddingTop:75, 
        backgroundColor:'#fff',
        height:'100%'
    }}>
      <Text style={{
        fontWeight:'900',
        fontSize:35,
        marginTop:20
        }}>Budget
        </Text>

        <View style={{
            marginTop:20
        }}>
            <Text style={{
                fontWeight:'900',
                fontSize:20
            }}>Choose spending habits for your trip</Text>
        <FlatList
          data={SelectBudgetOptions}
          renderItem={({item,index})=>(
            <TouchableOpacity style={{marginVertical:10}}
             onPress={()=>setSelectedTraveler(item)}
            >
                <OptionCard option={item} selectedOption={selectedOption}/>
            </TouchableOpacity>
          )}
        />
        
        </View>

        <TouchableOpacity 
        onPress={()=>onClickContinue()}
        style={{
            padding:15,
            backgroundColor:'black',
            borderRadius:15,
            marginTop:20
        }}>
          <Text style={{
               textAlign:'center',
               color:'#fff',
               fontWeight:'600',
               fontSize:20
          }}> Continue </Text> 

        </TouchableOpacity>
    </View>
  )
}