
import React,{useState,useEffect} from 'react';
import {View, StyleSheet, Text, Image, Modal,Pressable} from 'react-native';
import HomeMap from '../Components/HomeMap';
import Input from '../Components/Inputs';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ref, set,get, onValue,push} from "firebase/database";
import { db } from '../../firebase';


const HomeScreen= ({navigation}) =>{

  const[requestorLocation, setRequestorLocation]=useState();
  const[requestorDestination, setRequestorDestination]=useState();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [isModal2Visible, setIsModal2Visible] = useState(false);

  const [isModal3Visible, setIsModal3Visible] = useState(false);
  //set user location and destination latitudes
  const[locationLatitude, setLocationLatitude]=useState();
  const[locationLongitude, setLocationLongitude]=useState();
  const[destinationLatitude, setDestinationLatitude]=useState();
  const[destinationLongitude, setDestinationLongitude]=useState();


  //const [hasArrived, setHasArrived] = useState(false);
//const [markerCoordinates, setMarkerCoordinates] = useState([]);


  useEffect(() => {
    
    const dbRef = ref(db, 'requestCollection');
    onValue(dbRef, snapshot => {
      const data = snapshot.val();
      
      if (data) {
        const value1 = data.user_location;
        const value2 = data.user_destination;
        const value3 = data.user_location_longitude;
        const value4 = data.user_location_latitude;
        const value5 = data.user_destination_longitude;
        const value6 = data.user_destination_latitude;
  
        if (value1 && value2 && value3 && value4 && value5 && value6) {
          setRequestorLocation(value1);
          setRequestorDestination(value2);
          setLocationLatitude(value4);
          setLocationLongitude(value3);
          setDestinationLatitude(value6);
          setDestinationLongitude(value5);
          setIsModalVisible(true);
        } else {
          console.log('Some values are null or undefined');
        }
      } else {
        console.log('Data is null or undefined');
      }
    });
  }, []);

  const handleAccept = () => {
    // Handle the "Accept" button press here
    // You can perform any necessary actions and navigate to a new screen if needed
    const dbRef = ref(db, 'requestCollection');
    const dbBookingRef=ref(db, 'bookings')
    get(dbRef)
      .then((snapshot) => {
        const data = snapshot.val();
        const updatedData = {
          ...data,
          accepted: true,
        };
  
        return set(dbRef, updatedData);
        
        //set unique ID

        
       
       
      })
      .then(() => {
        return get(dbRef); // Retrieve the updated data from the requestCollection
      })
      .then((snapshot) => {
        
        const updatedData = snapshot.val();
        const newBookingRef = push(dbBookingRef); // Generate a unique ID for the new entry in the bookings collection
        
        return set(newBookingRef, updatedData); // Store the updatedData in the bookings collection with the unique ID
      })
      .then(()=>{

        
        setIsModalVisible(false)
        setIsModal2Visible(true); //Open Modal 2
     
      })
      .catch((error) => {
        // Handle any errors
      });
    
  
  };

  const handleArrival=()=>{

    const dbRef = ref(db, 'requestCollection');
    get(dbRef)
      .then((snapshot) => {
        const data = snapshot.val();
        const updatedData = {
          ...data,
          arrival: true,
        };
  
        return set(dbRef, updatedData);
      });
      

      setIsModal2Visible(false);
    
      setIsModal3Visible(true)

      

  }

const handleBegin=()=>{
  console.log(locationLatitude,locationLongitude,destinationLatitude,destinationLongitude)
 navigation.navigate('DestinationScreen'
 ,{
  locationLatitude: locationLatitude,
  locationLongitude: locationLongitude,
  destinationLatitude: destinationLatitude,
  destinationLongitude: destinationLongitude,
  requestorLocation:requestorLocation,
  requestorDestination:requestorDestination
})

setIsModal3Visible(false)

}

const handleReject=()=>{

}
 


    return(
    
      <SafeAreaView style={styles.container}>
        
         <HomeMap style={styles.map}
         // hasArrived={hasArrived} 
         destination_latitude={destinationLatitude} 
         destination_longitude={destinationLongitude}
         location_latitude={locationLatitude}
         location_longitude={locationLongitude}
         
         />  
         
        
         <Modal visible={isModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.popUp}>
            <Text style={styles.TextInputBodyLocation}>Current Location:{requestorLocation}</Text>
            <Text style={styles.TextInputBodyDestination}>Destination:{requestorDestination}</Text>
          </View>
          <Pressable onPress={handleAccept} style={styles.acceptButton}>
            <Text style={styles.acceptButtonText}>Accept</Text>
          </Pressable>
          <Pressable onPress={handleReject} style={styles.rejectButton}>
            <Text style={styles.acceptButtonText}>Reject</Text>
          </Pressable>
        </View>
      </Modal>

      <Modal visible={isModal2Visible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.popUp}>
            
            <Text style={styles.TextInputBodyDestination}>Customer Pickup Location:{requestorLocation}</Text>
          </View>
          <Pressable onPress={handleArrival} style={styles.acceptButton}>
            <Text style={styles.acceptButtonText}>I have arrived</Text>
          </Pressable>
        </View>
      </Modal>

      <Modal visible={isModal3Visible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.popUp}>
            
            <Text style={styles.TextInputBodyDestination}>Customer Destination:{requestorDestination}</Text>
          </View>
          <Pressable onPress={handleBegin} style={styles.acceptButton}>
            <Text style={styles.acceptButtonText}>Start Journey</Text>
          </Pressable>
        </View>
      </Modal>
                
        
     
      </SafeAreaView>
        
      
    )
}

export default HomeScreen;

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
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background color
    },
    popUp: {
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 20,
      marginBottom: 20,
      // Add any other necessary styles for the pop-up
    },
    acceptButton: {
      backgroundColor: 'green',
      padding: 10,
      borderRadius: 10,
      // Add any other necessary styles for the accept button
    },
    rejectButton: {
      backgroundColor: 'red',
      padding: 10,
      borderRadius: 10,
      // Add any other necessary styles for the accept button
    },
    acceptButtonText: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
      // Add any other necessary styles for the accept button text
    },

    TextInputBodyLocation:{
        
       backgroundColor:'#f5f5f5',
       
       padding:5,
       textAlign:'center',
       fontSize:15,
       fontWeight:'bold',
       marginBottom:15
       

  },
  TextInputBodyDestination:{
        
    backgroundColor:'#f5f5f5',
    
    padding:5,
    textAlign:'center',
    fontSize:15,
    fontWeight:'bold'
    

}
  });

  