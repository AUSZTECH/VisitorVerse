import React from 'react'

// React Navigation
import { createStackNavigator } from '@react-navigation/stack'

// Screens
import SettingScreen from '../Screens/Setting/SettingScreen'
// import DepartmentScreen from '../../screens/Settings/Department/DepartmentScreen'
// import ProfileScreen from '../../screens/Settings/Profile/ProfileScreen'
// import UserScreen from '../../screens/Settings/User/UserScreen'
// import VisitorFormScreen from '../../screens/Settings/VisitorForm/VisitorFormScreen'




const Stack = createStackNavigator()

const SettingStack = () => {
  return (
    <Stack.Navigator
      initialRouteName='Setting Screen'
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* setting */}
      <Stack.Screen name='Setting Screen' component={SettingScreen} />

    

    </Stack.Navigator>
  )
}

export default SettingStack
  
 


   

   

     
