import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Icon } from '@rneui/base'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectOrigin } from '../redux/slices/navSlice'

export default function NavOptions() {

    const data = [
        {
            id: 123,
            title: "Get a Ride",
            image: "https://links.papareact.com/3pn",
            screen: "MapScreen"
        },
        {
            id: 456,
            title: "Order Food",
            image: "https://links.papareact.com/28w",
            screen: "EatScreen"
        }
    ]

    const navigation = useNavigation();
    const origin = useSelector(selectOrigin);

  return (
    <View>
      <FlatList
        data={data}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({item}) =>(
            <TouchableOpacity  disabled={!origin} onPress={() => navigation.navigate(item.screen)} className="items-center bg-gray-200 w-40 m-2 py-6">
                <View className={`${!origin && "opacity-20"}`} >
                    <Image source={{ uri: item.image }} className="h-24 w-24" resizeMode='contain' />
                    <Text className="text-center font-bold text-lg mt-2" >{item.title}</Text>
                    <View className="bg-black rounded-full w-10 h-10 justify-center mt-4" >
                        <Icon color="white" name='arrowright' type='antdesign' />
                    </View>
                </View>
            </TouchableOpacity>
        )}
      />
    </View>
  )
}