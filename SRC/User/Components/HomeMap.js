
// import React from 'react';
// import {View, StyleSheet, Text, Image} from 'react-native';


// const HomeMap= props =>{

//     return(
//         <View>
//             <View>
//                <Image 
//                source={require('../../../assets/NairobiMap.jpg')}

//                style={{width:'100%', height:400}}
//                />
//              </View>

           
//         </View>
        
//     )
// }

// export default HomeMap;
import React from 'react';
import { StyleSheet, View ,Text} from 'react-native';
import MapView, { Marker,Polyline } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const HomeMap= ({ style, destination_latitude,destination_longitude, location_latitude, location_longitude}) => {
  //, hasArrived, markerCoordinates 

  const region={
    latitude:  -1.286389,
    longitude: 36.817223,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }

  const origin = {
    latitude: location_latitude || 0,
    longitude: location_longitude || 0,
  };

  const destination = {
    latitude: destination_latitude || 0,
    longitude: destination_longitude || 0,
  };

  if (origin.latitude === 0 || origin.longitude === 0 || destination.latitude === 0 || destination.longitude === 0) {
    // Handle the case when coordinates are null or 0
    return <Text>Loading map...</Text>;
  }
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={region}
      >

      <Marker coordinate={origin} title="Origin" />
        <Marker coordinate={destination} title="Destination" />

        <MapViewDirections
          origin={{
            latitude: 37.78825 ,
            longitude: -122.4324
          }}
          destination={{
            latitude: 37.79825,
            longitude: -122.4324,
          }}
          apikey={"AIzaSyB-7xpHozlQjrujfO3tDvYtIHJAy8uiLjU"   }
        />
      </MapView>
    </View>
  );
}

export default HomeMap;


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
