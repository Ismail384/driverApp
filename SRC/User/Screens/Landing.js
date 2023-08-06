
//import { Button } from "bootstrap";
import React from "react";
import {View, StyleSheet, Text, Image} from 'react-native';
import Button from "../Components/Button";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


const Landing= ({navigation}) =>{



    

    return(
        <View style={styles.container}>
            <View style={styles.box}>
            <Image
            style={styles.image}
           source={require('../../../assets/ambulanceTeam.jpg')} 
            resizeMode='center'
            
            /> 
            </View>
            <View style={styles.box}>
            <Text style={styles.landingText}> WELCOME TO N-AMBULANCE </Text>
            </View>
            <View style={styles.box}>
              <Button style={styles.landingButton} title="Get started" onPress={()=>{ navigation.navigate('Login')
    }} />
            </View>
         
        </View>
    )
}

export default Landing;

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection:'column',
        justifyContent:'space-between',
        
     
    
    },

    box: {
        width: '100%',
        height: '30%',
        marginTop:20
       // backgroundColor: 'red',
      },
    image:{
        width:300,
        height:200,
       
    },
    landingText:{
        marginTop:20,
        marginLeft:50,
        fontSize:25,
        fontWeight:'bold',
        
        

    },
    landingButton:{
        
        width:'65%',
        backgroundColor:'green',
        
        marginLeft:50,
        borderRadius:10,
        padding:8,
        textAlign:'center',
        fontWeight:'bold',
        fontSize:25,
    }
  });