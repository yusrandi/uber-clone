import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { MAP_API_KEY } from '../constant';
import { useDispatch } from 'react-redux';
import { setDestination } from '../redux/slices/navSlice';
import { useNavigation } from '@react-navigation/native';
import NavFavourites from './NavFavourites';
import { Icon } from '@rneui/base';


export default function NavigateCard() {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    

  return (
    <SafeAreaView className="flex-1 bg-white" >
      <Text className="text-center py-5 text-xl" >Good Morning, Use</Text>
      <View className="border-t border-gray-200 flex-shrink" >
        <View>
            <GooglePlacesAutocomplete
                styles={toInputBoxStyle}
                 fetchDetails={true}
                 returnKeyType={"search"}
                 minLength={2}
                 enablePoweredByContainer={false}
                placeholder='Where To ?'
                
                onPress={(data, details = null) => {
                    // 'details' is provided when fetchDetails = true
                    console.log(data, details);

                    dispatch(setDestination({
                        location: details.geometry.location,
                        description: data.description,
                    }));

                    navigation.navigate('RideOptionCard');

                    
                }}
                nearbyPlacesAPI="GooglePlacesSearch"
                debounce={400}
                query={{
                    key: MAP_API_KEY,
                    language: 'id',
                }}
            />
        </View>

        <NavFavourites/>
      </View>

      <View className='flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-200'>
                    
            <TouchableOpacity onPress={()=> navigation.navigate('RideOptionCard')} className='flex flex-row bg-black w-24 px-4 py-3 rounded-full space-x-2'>
                <Icon name='car' type='font-awesome' color='white' size={16} />
                <Text className='text-gray-300 text-md text-center' >Rides</Text>
            </TouchableOpacity>
            <TouchableOpacity className='flex flex-row  w-24 px-4 py-3 rounded-full space-x-2 border'>
                <Icon name='fast-food-outline' type='ionicon' color='black' size={16} />
                <Text className='text-black text-md text-center' >Eats</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

const toInputBoxStyle = StyleSheet.create({
    container:{
        backgroundColor: 'white',
        paddingTop: 20,
        flex: 0

    },
    textInput:{
        backgroundColor: '#DDDDDF',
        fontSize:18,
        borderRadius: 10,
    },
    textInputContainer:{
        paddingHorizontal: 20,
        paddingBottom: 0
    }
})