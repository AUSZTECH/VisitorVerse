import React, { useEffect, useState } from 'react'

// Native Base
import { Box, Button, Center, Heading, VStack, HStack, Icon, Input, Stack, Text, Divider } from 'native-base'
import { connect } from 'react-redux'
import Entypo from 'react-native-vector-icons/Entypo'
import { fetchVisitorData, deleteVisitorById } from '../../../../redux/actions/adminActions'
// Time
import moment from 'moment'
import { Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import BackHeader from '../../../../components/BackHeader'
import AttendanceCard from '../../../../components/Cards/AttendanceCard'
import TimeDisplay from '../../../../components/TimeDisplay'
const CheckInCheckOut = ({ checkInData, checkOutData, deleteVisitorById }) => {
    const navigation = useNavigation()
    const [time, setTime] = useState(new Date())
    const [attendanceData, setAttendanceData] = useState(null);

    useEffect(() => {
        setInterval(() => {
            setTime(new Date)
        }, 1000)
    }, [])


    useEffect(() => {
        console.log('Check-in Data:', checkInData);
        console.log('Check-out Data:', checkOutData);
        let newAttendanceData = null;
        if (checkOutData) {
            newAttendanceData = { ...checkOutData, type: 'Check-Out' };
        } else if (checkInData) {
            newAttendanceData = { ...checkInData, type: 'Check-In' };
        }
        setAttendanceData(newAttendanceData);
    }, [checkInData, checkOutData]);

    return (
        <Box variant={'container'} px={4}>
            <BackHeader>Visitor Entry</BackHeader>
            <Stack space={5} mt={5}>
               <TimeDisplay time={time}/>
                <HStack space={5} px={5}>
                    <Button
                        leftIcon={<Entypo name="login" size={20} color="white" />}
                        variant={'subtle'}
                        width={'45%'}
                        onPress={() => navigation.navigate('CheckInScreen')}
                    >
                        Check-In
                    </Button>
                    <Button
                        leftIcon={<Entypo name="log-out" size={20} color="white" />}
                        variant={'subtle'}
                        width={'45%'}
                        onPress={() => navigation.navigate('Admin Scanner Screen')}
                    >
                        Check-Out
                    </Button>
                </HStack>
                <Stack>
                    {attendanceData ? (
                        <AttendanceCard data={attendanceData} />
                    ) : (
                        <Text fontSize="xl" color="coolGray.500">No Check In/Out Data</Text>
                    )}
                </Stack>
            </Stack>
        </Box>
    )
}

const mapStateToProps = (state) => ({
    checkInData: state.admin.checkInData,
    checkOutData: state.admin.checkOutData,
});

const mapDispatchToProps = {
    fetchVisitorData,
    deleteVisitorById
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckInCheckOut);