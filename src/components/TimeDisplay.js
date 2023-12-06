import React from 'react'
import moment from 'moment'
// Native Base
import { Box, Button, Center, Heading, VStack, HStack, Icon, Input, Stack, Text, Divider } from 'native-base'
import { connect } from 'react-redux'
import Entypo from 'react-native-vector-icons/Entypo'

const TimeDisplay = ({ time }) => {
    return (
        <Center py={4} my={4} mx={5}>
            <HStack space={2} alignItems="center">
                <Box bg="coolGray.300" px={4} py={2} rounded="md">
                    <Text color="white" fontSize="4xl">{moment(time).format('HH')}</Text>
                </Box>
                <Text fontSize="4xl" color="coolGray.500">:</Text>
                <Box bg="coolGray.300" px={4} py={2} rounded="md">
                    <Text color="white" fontSize="4xl">{moment(time).format('mm')}</Text>
                </Box>
                <Text fontSize="4xl" color="coolGray.500">:</Text>
                <Box bg="coolGray.300" px={4} py={2} rounded="md">
                    <Text color="white" fontSize="4xl">{moment(time).format('ss')}</Text>
                </Box>
            </HStack>
            <Text color="coolGray.600" fontSize="xl" mt={2}>{moment(time).format('ddd, MMM DD')}</Text>
        </Center>
    );
};

export default TimeDisplay