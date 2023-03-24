import { View, Text, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import NavOptions from '../components/NavOptions'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { MAP_API_KEY } from '../constant';
import { TextInput } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { setDestination, setOrigin } from '../redux/slices/navSlice';
import NavFavourites from '../components/NavFavourites';

export default function HomeScreen() {

    const dispatch = useDispatch();
  return (
    <SafeAreaView className="bg-white h-full" >
       <View className='p-5'>
            <Image source={{ uri: 'https://links.papareact.com/gzs' }} className="w-20 h-20" resizeMode='contain' />
        
            <GooglePlacesAutocomplete
                styles={{ 
                    container:{
                        flex: 0
                    },
                    textInput:{
                        fontSize:18
                    }
                 }}
               
                 fetchDetails={true}
                 minLength={2}
                 enablePoweredByContainer={false}
                placeholder='Where From ?'
                onPress={(data, details = null) => {
                    // 'details' is provided when fetchDetails = true
                    console.log(data, details);

                    dispatch(setOrigin({
                        location: details.geometry.location,
                        description: data.description,
                    }));

                    dispatch(setDestination(null));

                }}
                nearbyPlacesAPI="GooglePlacesSearch"
                debounce={400}
                query={{
                    key: MAP_API_KEY,
                    language: 'id',
                }}
            />
            <NavOptions/>
            <NavFavourites/>
        </View>
    </SafeAreaView>
  )
}