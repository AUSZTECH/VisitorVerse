//React
import React from 'react'

// React Navigation
import { createStackNavigator } from '@react-navigation/stack'

// Screens
import UserHomeScreen from '../Screens/Home/UserHomeScreen'
import QrCodeScreen from '../Screens/QrCode/QrCodeScreen'
import Ticket from '../../Auth/Screens/Ticket'
import UserScanner from '../Screens/Home/UserScanner'

const Stack = createStackNavigator()

const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName='User Home'
      screenOptions={{
        headerShown: false,
      }}
    >
     
      <Stack.Screen name='User Home' component={UserHomeScreen} />
      <Stack.Screen name='Qr Code' component={QrCodeScreen} />
      <Stack.Screen name='Qr Code Scanner' component={UserScanner} />
      <Stack.Screen name='Qr Ticket' component={Ticket} />


    </Stack.Navigator>
  )
}

export default HomeStack