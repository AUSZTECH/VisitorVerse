//React
import React from 'react'

// React Navigation
import { createStackNavigator } from '@react-navigation/stack'

// Screens
import CheckInCheckOut from '../Screens/CheckInOut/CheckInCheckOut'
import CheckInScreen from '../Screens/CheckInOut/CheckIn/CheckInScreen'
import VisitorForm from '../Screens/Home/Visitor/VisitorForm'
import CheckOutScreen from '../Screens/CheckInOut/CheckOut/CheckOutScreen'
import ScannerScreen from '../Screens/Home/AdminHome/ScannerScreen'
import VisitorTicket from '../Screens/Home/Visitor/VisitorTicket'

const Stack = createStackNavigator()

const CheckingStack = () => {
  return (
    <Stack.Navigator
      initialRouteName='CheckInOut'
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='CheckInOut' component={CheckInCheckOut} />
      <Stack.Screen name='CheckInScreen' component={CheckInScreen} />
      <Stack.Screen name='Admin Scanner Screen' component={ScannerScreen} />
      <Stack.Screen name='Visitor Form Screen' component={VisitorForm} />
      <Stack.Screen name='Visitor Ticket' component={VisitorTicket} />
      <Stack.Screen name='CheckOutScreen' component={CheckOutScreen} />
      

    </Stack.Navigator>
  )
}

export default CheckingStack