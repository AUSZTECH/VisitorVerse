import React from 'react'

// Navigation 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

// Icons
import Ionicons from 'react-native-vector-icons/Ionicons'

// Stacks
import HomeStack from './Stacks/HomeStack'
import SettingStack from './Stacks/SettingStack'
import CheckingStack from './Stacks/CheckingStack'

const Tab = createBottomTabNavigator()

const AdminContainer = () => {
    return (
        <Tab.Navigator
            initialRouteName='Check In'
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: '#34aa99',
                tabBarInactiveTintColor: '#aeddd6',
                tabBarHideOnKeyboard: true,
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: 'absolute',
                    // bottom: 10,
                    // right: 10,
                    // left: 10,
                    // borderRadius: 10,
                    height: 45,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,

                    elevation: 5,
                },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    let rn = route.name;

                    if (rn === 'Home') {
                        iconName = focused ? 'home' : 'home-outline'
                    } 
                   
                    else if (rn === 'Setting') {
                        iconName = focused ? 'settings' : 'settings-outline'
                    } 
                    // else if (rn === 'Visitor') {
                    //     iconName = focused ? 'reorder-four-outline' : 'reorder-four'
                    // } 
                    else if (rn === 'Check In') {
                        iconName = focused ? 'log-in' : 'log-in-outline'
                    }

                    return <Ionicons name={iconName} color={color} size={size} />
                },
                unmountOnBlur: true
            })}
        >
            <Tab.Screen name='Check In' component={CheckingStack} />
            <Tab.Screen name='Home' component={HomeStack} />
            <Tab.Screen name='Setting' component={SettingStack} />
        </Tab.Navigator>
    )
}

export default AdminContainer