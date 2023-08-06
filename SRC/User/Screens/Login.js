
import Button from "../Components/Button";
import React,{useState} from "react";

import { MaterialCommunityIcons } from '@expo/vector-icons';
//import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import {View, StyleSheet, Text, Pressable,TextInput} from 'react-native';
import Input from "../Components/Inputs";
import { SafeAreaView } from "react-native-safe-area-context";



import { ref, set,get, onValue,push,snapshot} from "firebase/database";
import { db } from '../../firebase';
import {  signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from "../../firebase";

//const auth = getAuth();


//import { useState } from "react/cjs/react.production.min";

const Login= ({navigation}) =>{

 const[driverEmail, setDriverEmail]=useState('');
 const[driverPassword, setDriverPassword]=useState('');


    const LoginDriver=()=>{
 

//         const dbRef = ref(db, 'drivers');
//  onValue(dbRef, snapshot => {
//     const data = snapshot.val();

//     let driverFound = false;
    
//     Object.keys(data).forEach(driverId => {
//       const driver = data[driverId];
//       if (driver.driver_email === driverEmail && driver.driver_password === driverPassword) {
//         driverFound = true;

//        alert(driverFound)
//         take user to next screen

//         navigation.navigate('Homescreen')
        // // ...
        signInWithEmailAndPassword(auth, driverEmail, driverPassword)
        .then(() => {
          // Authentication successful
          const user = auth.currentUser;
    
          // Update the driver's online status in the database
          if (user) {
            const dbRef = ref(db, `onlineDrivers/${user.uid}/status`);
            set(dbRef, 'online');
    
            // Take the user to the next screen
            navigation.navigate('Homescreen');
          }
        })
        .catch((error) => {
          // Authentication failed
          alert('Invalid email or password');
          console.log(error);
        });



      }
    
    // if (!driverFound) {
    //   alert('Invalid email or password');
    // }
//        

// alert(driverEmail)
    

    return(
      
        <View style={styles.container}>
            <View>
            <Text style={styles.loginText}> Log Into Your Account   </Text>
            </View>
            <View>
            <View style={styles.inputContainer}>

            <MaterialCommunityIcons name="email-outline" size={24} color="black" />
            <Input name="email address" 
            value={driverEmail} 
            onChangeText={(text) => setDriverEmail(text)}
            isPassword={false}
            />

</View> 

<View style={styles.inputContainer}>

<Ionicons name="key-outline" size={24} color="black" />
            <Input name="Password"
             value={driverPassword}
             onChangeText={ setDriverPassword}
             isPassword={true}
              />

</View>
            </View>
            <View>
                {/*<Button color='red' title="Log In" onPress={LoginUser}  /> */}
                <Button title="Log In" onPress={LoginDriver}  />
            </View>
            
         
        </View>
    
    )
}

export default Login;


const styles = StyleSheet.create({
  container: {
      display:'flex',
      flexDirection:'column',
      justifyContent:'space-evenly',
    width:'80%',
    height:'75%',
    marginTop:70,
    marginLeft:30,
    
  
    backgroundColor: '#D9D9D9',
   
  
  },
  loginText:{
      marginLeft:50,
      fontSize:20,
      fontWeight:'bold',
      

  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    width:'90%',
    padding:8,
    paddingHorizontal: 10,
    marginTop:10,
    marginLeft:15
  },
  submitButton:{
      width:'60%',
      backgroundColor:'green',
      marginTop:20,
      marginLeft:50,
      borderRadius:10,
      padding:10,
      textAlign:'center',
      fontWeight:'bold',
      fontSize:25,
  }
});