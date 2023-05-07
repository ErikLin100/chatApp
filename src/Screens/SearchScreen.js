import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { FlatList, TextInput } from 'react-native-gesture-handler'
import { SimpleLineIcons } from '@expo/vector-icons'
import { userRef } from '../../firebase/config'
import { getDocs, where, query } from 'firebase/firestore'
import { useNavigation } from '@react-navigation/native'
const squirrel = require('../../assets/squirrel-no-bg.png')
const userAvatar = require('../../assets/man.png')

const SearchScreen = () => {
  const navigation = useNavigation()
  const [searchFriend, setSearchFriend] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [found, setFound] = useState(false)
  const [searchFriendsName, setSearchFriendsName] = useState([])

  // Käsittelee käyttäjän hakutoiminnon

  const HandleSearch = async () => {
    if(searchFriend !== ''){
      setSearchFriendsName([])
      setIsLoading(true)

      // Hae käyttäjät, joiden käyttäjätunnus vastaa hakukriteerejä

      const queryResult = query(
        userRef,
        where('username', '>=', searchFriend.trim()),
        where('username', '<=', searchFriend.trim()+'\uf8ff')
        )

        // Tarkista, onko tuloksia löytynyt
      
      const querySnapshot = await getDocs(queryResult)
      if(!querySnapshot.empty){
        let friends = []
        querySnapshot.forEach((document) => {
          const {profilePic, username} = document.data()
          friends.push({profilePic, username})
        })
        setSearchFriendsName(friends)
        setFound(true)
      }else{
        setFound(false)
      }
      setIsLoading(false)
    }
  }
  return (
    <View className='bg-gray-200 flex-1'>
        <View className = 'flex-row items-center content-center my-3 mx-3 mb-10'>
          <TextInput 
          className='tracking-widest bg-gray-100 rounded-lg text-base py-2 px-1 mx-2 w-[85%]'
          placeholder="Search"
          autoCapitalize="none"
          keyboardType="default"
          autoFocus = {true}
          value = {searchFriend}
          onChangeText={(text) => setSearchFriend(text)}
          /> 
          <TouchableOpacity onPress={HandleSearch} className='bg-orange-400 w-10 h-11 rounded-lg items-center justify-center'>
          <SimpleLineIcons name="magnifier" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <View>
          {isLoading && <ActivityIndicator size={'large'} color='gray'/>}
          {found ? (
            <View>
              <FlatList 
              className = 'mx-3'
              data={searchFriendsName}
              showsVerticalScrollIndicator={false}
              keyExtractor = {(item) => item.username}
              renderItem={({item}) => (

                // replace jotta kun etsittyä nimeä klikataan siirrytään chat huoneeseen ja siitä kun lähtee pois niin ei palata search osaan vaan homescreeniin

                <TouchableOpacity onPress={()=> navigation.replace('Chat', {friendName:item.username, friendAvatar: item.profilePic})}>
                  <View className = 'flex-row items-center space-x-4 bg-gray-100 px-2 py-2 rounded-lg'>
                    {item.profilePic !== undefined ? (
                       <Image source={{uri:item.profilePic}} className='h-12 w-12 rounded-full'/>
                    ): (
                      <Image source = {userAvatar} className='h-12 w-12 rounded-full' />
                    )}
                    <Text className='tracking-widest font-medium text-lg '>{item.username}</Text>
                   
                  </View>
                </TouchableOpacity>
              )}
              />
            </View>
          ):(
            <View className='mx-6 items-center'>
              <Image source={squirrel} className='h-[85%] w-full'/>
            </View>
          )}
        </View>
    </View>
  )
}

export default SearchScreen