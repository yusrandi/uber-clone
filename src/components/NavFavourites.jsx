import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { mapData } from '../data/mapData'
import { Icon } from '@rneui/base'

export default function NavFavourites() {
  return (
    <FlatList
        data={mapData}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => (
            <View className='bg-gray-100 h-0.5' />
        )}
        renderItem={({item: {location, destination, icon}}) =>(
        <TouchableOpacity  className="flex-row items-center p-3">
            
                <View className="mr-4 rounded-full bg-gray-300 p-3" >
                    <Icon color="white" name={icon} type='ionicon' size={18} />
                </View>
            <View>
                <Text className='font-semibold text-lg' >{location}</Text>
                <Text className='text-gray-500' >{destination}</Text>
            </View>
        </TouchableOpacity>
    )}
  />
  )
}