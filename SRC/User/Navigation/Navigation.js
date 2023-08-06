import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from "react-native";
import Login from "../Screens/Login";
import Landing from "../Screens/Landing";
import HomeScreen from "../Screens/HomeScreen";
import DestinationScreen from "../Screens/DestinationScreen";


const Navigation= props =>{
    const Stack=createNativeStackNavigator();
    return(
        <View style={{ flex: 1 }}>
        <NavigationContainer>
         <Stack.Navigator initialRouteName="landing" options={{headerShown:false}}>
           <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
          <Stack.Screen name="landing" component={Landing} options={{headerShown:false}}/>
           <Stack.Screen name="Homescreen" component={HomeScreen} options={{headerShown:false}}/> 
           <Stack.Screen name="DestinationScreen" component={DestinationScreen} options={{headerShown:false}}/> 
         </Stack.Navigator>
       </NavigationContainer>
       </View>
    )
}

export default Navigation;