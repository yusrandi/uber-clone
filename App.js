import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native';
import { TailwindProvider } from 'tailwindcss-react-native';
import HomeScreen from './src/screens/HomeScreen';
import { Provider } from 'react-redux'
import { store } from './src/redux/store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MapScreen from './src/screens/MapScreen';



export default function App() {
    const Stack = createStackNavigator();
  return (
      <NavigationContainer>
            <Provider store={store} >
                <TailwindProvider>
                    <SafeAreaProvider>
                        <KeyboardAvoidingView  className='flex-1' behavior={Platform.OS === "ios" ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}>
                            <Stack.Navigator initialRouteName={'HomeScreen'}>
                                <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
                                <Stack.Screen name="MapScreen" component={MapScreen} options={{ headerShown: false }} />
                            </Stack.Navigator>
                        </KeyboardAvoidingView>
                    </SafeAreaProvider>
                </TailwindProvider>
            </Provider>
        </NavigationContainer>
  );
}


