import { View, Text, ActivityIndicator, ScrollView ,TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import StartNewTripCard from '../../components/MyTrips/StartNewTripCard';
import {collection,query,where,getDocs} from 'firebase/firestore'
import {auth,db} from '../../configs/FirebaseConfig'
import UserTripList from '../../components/MyTrips/UserTripList'
import { router} from 'expo-router'


export default function MyTrip() {

  const [userTrips,setUserTrips]=useState([]);
  const user=auth.currentUser;
  const [loading,setLoading]=useState(false);

  useEffect(()=>{
    user&&GetMyTrips();
  },[user])

  const GetMyTrips=async()=>{
    try {
      setLoading(true);
      setUserTrips([]);
      const q=query(collection(db,'UserTrips'),where('userEmail','==',user?.email));
      const querySnapshot=await getDocs(q);
      
      const trips = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        trips.push(doc.data());
      });
      setUserTrips(trips);
    } catch (error) {
      console.error('Error fetching trips:', error);
      setUserTrips([]);
    } finally {
      setLoading(false);
    }
  }
  return (
    <ScrollView style={{
      padding:25,
      paddingTop:55,
      backgroundColor:'#fff',
      height:'100%',
    }
    }>

<View style={{
  display:'flex',
  flexDirection:'row',
  alignItems:'center',
  justifyContent:'space-between'
}}>
  {/* <TouchableOpacity onPress={() => router.replace('/mytrip')} style={{ paddingRight: 10 }}>
    <Ionicons name="arrow-back" size={30} color="black" />
  </TouchableOpacity> */}

  <Text style={{
    fontSize:35,
    fontWeight:'bold'
  }}>My Trips</Text>

  <TouchableOpacity onPress={()=>router.push('/create-trip/search-place')}>
    <Ionicons name="add-circle-sharp" size={50} color="black" />
  </TouchableOpacity>
   </View>


      {loading&&<ActivityIndicator size={'large'} color={'black'}></ActivityIndicator>}

      {!loading && (
        userTrips?.length === 0 ?
          <StartNewTripCard/>
          :
          <UserTripList userTrips={userTrips}/>
      )}

    </ScrollView>

  )
}


