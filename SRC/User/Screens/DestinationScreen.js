
import React from 'react'
import {View, StyleSheet, Text, Image, Modal,Pressable} from 'react-native';
import HomeMap from '../Components/HomeMap';
import { useRoute,useNavigation } from '@react-navigation/native';

import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

import { useState ,useEffect} from 'react';

const DestinationScreen = () => {

    
  const route=useRoute();
  const { locationLatitude, locationLongitude, destinationLatitude, 
    destinationLongitude,
    requestorDestination,
    requestorLocation
 } = route.params;
  const navigation=useNavigation();

  const [driverPosition, setDriverPosition] = useState({
    latitude: locationLatitude,
    longitude: locationLongitude,
  });

  useEffect(() => {
    // Simulate driver movement every 1 second
    const interval = setInterval(() => {
      // Generate random latitude and longitude offsets for movement
      const latOffset = (Math.random() - 0.5) * 0.001;
      const lngOffset = (Math.random() - 0.5) * 0.001;

      // Update driver position by applying the offsets
      setDriverPosition(prevPosition => ({
        latitude: prevPosition.latitude + latOffset,
        longitude: prevPosition.longitude + lngOffset,
      }));
    }, 1000);

    return () => {
      clearInterval(interval); // Clear the interval when the component unmounts
    };
  }, []);

     
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        //onMapReady={handleMapReady}
        initialRegion={{
          latitude:  -1.286389,
          longitude: 36.817223,
          latitudeDelta: 0.15, 
          longitudeDelta: 0.15,
        }}
      >
        <Marker
          coordinate={driverPosition}
          title='{`from - ${requestorLocation}- towards Destination`}'
        />
        <Marker
          coordinate={{
            latitude: destinationLatitude,
            longitude: destinationLongitude,
          }}
          pinColor='blue'
          title={requestorDestination}
        />
        <MapViewDirections
          origin={{
            latitude: locationLatitude,
            longitude: locationLongitude,
          }}
          destination={{
            latitude: destinationLatitude,
            longitude: destinationLongitude,
          }}
          apikey={"AIzaSyB-7xpHozlQjrujfO3tDvYtIHJAy8uiLjU"   }

          strokeWidth={8}
  strokeColor="blue"
  lineDashPattern={[10, 10]}
  zIndex={2}
        />
      </MapView>
    
    </View>


  )
}

export default DestinationScreen
const styles = StyleSheet.create({
    container: {
        flex:1,
        marginLeft:0,
       // width:'100%',
        // backgroundColor:'black'
          
    
      
    },
    map:{
      height:400,
      flex:0.7
    },
})