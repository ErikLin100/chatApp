import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import LoginScreen from './src/Screens/LoginScreen';
import RegisterScreen from './src/Screens/RegisterScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthenticatedUserProvider, { AuthenticatedUserContext } from './Context/AuthenticationContext';
import HomeScreen from './src/Screens/HomeScreen';
import { useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { Auth } from './firebase/config';
import ProfileScreen from './src/Screens/ProfileScreen';
import SearchScreen from './src/Screens/SearchScreen';
import ChatScreen from './src/Screens/ChatScreen';
const loadingGif = require('./assets/Loading.gif');


const Stack = createNativeStackNavigator();

function RootNavigator () {
  const {user, setUser} = useContext(AuthenticatedUserContext);
  const [isLoading, setIsLoading] = useState(false);

  // tunnistaa kaiken toiminnan mikä liittyy autentikointiin.
  useEffect(() => {
    onAuthStateChanged(Auth, (user) => {
      
      if(user){
        setUser(user);
        setIsLoading(false);
      }else{
        setIsLoading(false);
      }
    });
   
  }, []);

  return(
    <NavigationContainer>
      {!user && isLoading === true ? <Image source={loadingGif} className = 'h-full w-full'/> : !user && isLoading === false? (<AuthStack />) : (<MainStack />)}
    </NavigationContainer>
  );
}
//käyttäjä lähetetään joko Authstack tai Mainstacking läpi
function AuthStack(){
  return (
    
        <Stack.Navigator 
            initialRouteName="Login" 
            screenOptions={{headerShown: false}}
      >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
    
  );
}

function MainStack(){
  return(
  
    <Stack.Navigator>
      <Stack.Screen name = 'EZchat' component={HomeScreen}/>
      <Stack.Screen name = 'Profile' component={ProfileScreen}/>
      <Stack.Screen name = 'Chat' component={ChatScreen} options = {{title: ""}}/>
      <Stack.Screen name = 'Search' component={SearchScreen} options = {{title: "Find yoour friends"}}/>
    </Stack.Navigator>
  
  );
}


export default function App() {
  return (
    <AuthenticatedUserProvider>
      <RootNavigator />
  </AuthenticatedUserProvider>
  );
}

