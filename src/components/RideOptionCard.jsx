import { View, Text, SafeAreaView, TouchableOpacity, FlatList, Image } from 'react-native'
import React, { useState } from 'react'
import { Icon } from '@rneui/base'
import { useNavigation } from '@react-navigation/native'
import { riderData } from '../data/riderData';
import { useSelector } from 'react-redux';
import { selectTravelTimeInformation } from '../redux/slices/navSlice';

export default function RideOptionCard() {
    const navigation = useNavigation();
    const [selected, setSelected] = useState(null);
    const travelTimeInformation = useSelector(selectTravelTimeInformation);


    const SURGE_CHARGE_RATE = 1.5;

  return (
    <SafeAreaView className='bg-white flex-grow' >
      <View>
        <TouchableOpacity onPress={() => navigation.navigate('NavigateCard')} className='absolute top-3 left-3 z-50 p-3 rounded-full' >
          <Icon name='chevron-left' type='font-awesome' />
        </TouchableOpacity>
        <Text className='text-center text-lg py-5' >Select a Ride - {travelTimeInformation?.distance?.text}</Text>
      </View>

      <FlatList
        data={riderData}
        keyExtractor={(item) => item.id}
        renderItem={({item: {id, title, multiplier, image}, item}) => (
            <TouchableOpacity  onPress={() => setSelected(item)} className={`flex-row justify-between items-center px-10 ${id === selected?.id && "bg-gray-200"}`} >
                <Image source={{ uri: image }} className="w-20 h-20" resizeMode='contain' />
                <View className='items-start'>
                    <Text className='text-lg font-semibold'>{title}</Text>
                    <Text className=''>{travelTimeInformation?.duration?.text} Travel Time</Text>
                </View>
                    <Text className='text-lg font-bold'>{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(travelTimeInformation?.duration.value * SURGE_CHARGE_RATE * multiplier / 100)}</Text>
            </TouchableOpacity>
        )}
      />

      <View>
        <TouchableOpacity  disabled={!selected}  className={`bg-black py-3 m-3 ${!selected && "bg-gray-300"}`} >
            <Text className='text-white text-lg text-center' >Choose {selected?.title}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}