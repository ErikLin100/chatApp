import { View, Text, Image, TextInput, TouchableOpacity, Alert, StatusBar } from 'react-native';
import React, { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Auth } from "../../firebase/config";
import { registerIndieID } from 'native-notify';



const backImage = require("../../assets/bground2.jpeg");

const LoginScreen = () => {
    const navigation = useNavigation()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const onHandleLogin = () => {
        if(email !== "" && password !== ""){
            signInWithEmailAndPassword(Auth, email, password).then(() => 
                registerIndieID(`${email}`, 7813, 'NU3z01ObyIlH8qZ4Esd3m5')

            ).catch((error) =>{
                Alert.alert("Error", error.message)
            });
        }
    };
  return (
  <KeyboardAwareScrollView className='bg-black'>
    <View >
      <Image source={backImage} className={'object-cover h-80 w-full'}/>
    </View>
    <View className='bg-white h-screen rounded-t-3xl' >
        <Text className ='text-[#d60e45] text-3xl font-semibold text-center py-3 mt-3'>
            Sign in{" "}
            
        </Text>
        <View>
            <TextInput 
            className = 'tracking-widest bg-gray-100 rounded-lg w-80 text-base py-2 px-1 mx-3 mb-5'
            placeholder='Enter Email'
            keyboardType='email-address'
            autoCapitalize='none'
            textContentType='emailAddress'
            value={email}
            onChangeText={(text) => setEmail(text)}
            />

            <TextInput 
            className = 'tracking-widest bg-gray-100 rounded-lg w-80 text-base py-2 px-1 mx-3 mb-5'
            placeholder='Enter Password'
            secureTextEntry={true}
            autoCorrect={false}
            autoCapitalize='none'
            textContentType='password'
            value={password}
            onChangeText={(text) => setPassword(text)}
            />

        </View>
        <TouchableOpacity onPress={onHandleLogin} className='bg-[#fac25a] py-2 rounded-md mx-10 mt-16 mb-3'>
            <Text className='text-center font-semibold text-white text-lg'>Login</Text>
        </TouchableOpacity>
        <View className='flex-row space-x-2 justify-center'>
            <Text>Dont have an account ?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text className='text-[#d60e45] font-medium'>Sign up</Text>
            </TouchableOpacity>
        </View>
    </View>
    <StatusBar barStyle={"light-content"}/>
    </KeyboardAwareScrollView>
  );
};

export default LoginScreen