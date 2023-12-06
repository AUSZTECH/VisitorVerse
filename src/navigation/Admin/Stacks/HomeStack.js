//React
import React from 'react'

// React Navigation
import { createStackNavigator } from '@react-navigation/stack'

// Screens
import HomeScreen from '../Screens/Home/HomeScreen'
import AddVisitor from '../Screens/Home/Visitor/AddVisitor'
import WalkInVisitor from '../Screens/Home/AdminHome/WalkInVisitor'
import PreRegisteredVisitor from '../Screens/Home/AdminHome/PreRegisteredVisitor'
// import VisitorForm from '../Screens/Home/Visitor/VisitorForm'
import VisitorTicket from '../Screens/Home/Visitor/VisitorTicket'

const Stack = createStackNavigator()

const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName='Admin Home'
      screenOptions={{
        headerShown: false,
      }}
    >
     
      <Stack.Screen name='Admin Home' component={HomeScreen} />
      <Stack.Screen name='Add Visitor' component={AddVisitor} />
      <Stack.Screen name='Walk In Visitor' component={WalkInVisitor} />
      <Stack.Screen name='Pre-Registered Visitor' component={PreRegisteredVisitor} />
      {/* <Stack.Screen name='Visitor Form' component={VisitorForm} /> */}
      <Stack.Screen name='Visitor Ticket' component={VisitorTicket} />

    </Stack.Navigator>
  )
}

export default HomeStack