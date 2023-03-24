import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import MapComponent from '../components/MapComponent'
import { createStackNavigator } from '@react-navigation/stack'
import NavigateCard from '../components/NavigateCard';
import RideOptionCard from '../components/RideOptionCard';
import { Icon } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';

export default function MapScreen() {

    const Stack = createStackNavigator();
    const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}  className='absolute bg-gray-100 top-16 left-8 z-50 p-3 rounded-full shadow-lg'>
        <Icon name='chevron-left' />
      </TouchableOpacity>
      <View className="h-1/2">
        <MapComponent/>
      </View>
      <View className="h-1/2">
            <Stack.Navigator>
                <Stack.Screen name='NavigateCard' component={NavigateCard} options={{ headerShown: false }} />
                <Stack.Screen name='RideOptionCard' component={RideOptionCard} options={{ headerShown: false }} />
            </Stack.Navigator>
      </View>
    </View>
  )
}