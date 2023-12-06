import React, { useContext, memo } from 'react'
import { SafeAreaView } from 'react-native'

// React Navigation
import { useNavigation } from '@react-navigation/native'

// Native Base
import { Box, Pressable, Center, Heading, Stack, Icon, ScrollView, HStack, Card, Divider, Avatar, Text, Image, Button } from 'native-base'

// Icons
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

import LoadingIndicator from '../../../../components/LoadingIndicator'

const SettingScreen = () => {

  const menu = [
    {
        title: 'Edit Profile',
        iconType: <Ionicons />,
        iconName: 'person-outline',
        screen: ''
    },
    {
        title: 'Visitor Form Configuration',
        iconType: <FontAwesome5/>,
        iconName: 'tasks',
        screen: ''
    },
    {
        title: 'Reset Passward',
        iconType: <MaterialIcon/>,
        iconName: 'lock-reset',
        screen: ''
    },
  
    {
        title: 'Company Profile',
        iconType: <Ionicons />,
        iconName: 'business-outline',
        screen: ''
    },
    {
        title: 'Biometric',
        iconType: <MaterialCommunityIcons />,
        iconName: 'fingerprint',
        screen: ''
    },
    
 
]

    const navigation = useNavigation()

    const MenuItem = memo(({ item, index, totalItems }) => {
      return (
          <>
              <Button
                  justifyContent="flex-start"
                  variant={'ghost'}
                  borderTopRadius={index === 0 ? 15 : 0}
                  borderBottomRadius={0}
                  leftIcon={<Icon as={item.iconType} name={item.iconName} mr={2} />}
                  onPress={() => navigation.navigate(item.screen)}
              >
                  {item.title}
              </Button>
              <Divider opacity={0.5} />
          </>
      );
  })

    return (
        <Box variant={'container'} safeAreaTop >
            <LoadingIndicator />
            <Stack space={4} >
                <Box variant={'card'} mt={6} mx={4} p={2} >
                    <HStack space={4} alignItems={'center'} >
                        <Avatar bgColor={'gray.300'} >
                            <Icon as={AntDesign} name={'user'} size={'xl'} color={'trueGray.800'} />
                        </Avatar>
                        <Stack >
                            <Text fontWeight={'600'} fontSize={18} color={'primary.600'} >Hassnain Gohar</Text>
                            <Text fontSize={14} >Ausz-Tech</Text>
                        </Stack>
                    </HStack>
                </Box>
                <Box variant={'card'} mx={4} p={0} >
                    {menu.map((item, index) => (
                        <MenuItem key={index} item={item} index={index} totalItems={menu.length} />
                    ))}
                    <Button
                        justifyContent="flex-start"
                        variant={'ghost'}
                        borderRadius={0}
                        borderBottomRadius={15}
                        leftIcon={<Icon as={MaterialCommunityIcons} name={'logout'} mr={2} />}
                    >Logout</Button>
                </Box>
            </Stack>
        </Box>
    )
}

export default SettingScreen