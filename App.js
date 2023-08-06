

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Navigation from './SRC/User/Navigation/Navigation';
//import Login from './SRC/User/Screens/Login';



export default function App() {

  
  return (
    
    <View style={{flex:1}}>
      <StatusBar backgroundColor="yellow" barStyle="light-content" />
     <Navigation /> 
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
