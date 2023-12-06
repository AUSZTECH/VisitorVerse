//React
import React, { useEffect, useState } from 'react';
//Native-Base
import { Box, Text, Heading, FlatList, VStack, Pressable, Modal, Center, HStack, Spacer, Menu, IconButton, Fab, Icon, Stack, Divider } from 'native-base';
//Navigation
import { useNavigation } from '@react-navigation/native';
//Icons
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
//Redux
import { connect } from 'react-redux';
import { getVisitorList, getQrCode, fetchVisitorData, deleteVisitorById } from '../../../../redux/actions/adminActions';
//Components
import TicketCard from '../../../../components/Cards/TicketCard';
import AttendanceCard from '../../../../components/Cards/AttendanceCard';
//Qr Code
import QRCode from 'react-native-qrcode-svg';
//date-fns
import { isPast, isToday, isBefore } from 'date-fns';


const UserHomeScreen = ({ getVisitorList, visitorList, getQrCode, visitorData, checkInData, checkOutData, deleteVisitorById }) => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [visitorDetails, setVisitorDetails] = useState({});
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [attendanceData, setAttendanceData] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

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

  useEffect(() => {
    if (typeof visitorData === 'string') {
      setVisitorDetails(JSON.parse(visitorData));
    } else if (typeof visitorData === 'object') {
      setVisitorDetails(visitorData);
    }
  }, [visitorData]);

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  }

  const loadData = async () => {
    setIsLoading(true);
    try {
      await Promise.all([getVisitorList(), getQrCode()]);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isDatePast = (dateString) => {
    if (!dateString || typeof dateString !== 'string') {
      return false;
    }
    const parts = dateString.split("-");
    const date = new Date(parts[2], parts[1] - 1, parts[0]);
    return isBefore(date, new Date()) && !isToday(date);
  };

  const handleDeleteVisitor = async (deleteID) => {
    setIsLoading(true);
    try {
      await deleteVisitorById(deleteID);
      await getVisitorList();
    } catch (error) {
      console.error('Error deleting visitor:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const showQrCode = visitorDetails.date && !isDatePast(visitorDetails.date);
  const pastTickets = visitorList.filter(ticket => ticket.date && isDatePast(ticket.date));

  console.log(showQrCode, 'qr')
  return (
    <Box variant={'container'} safeArea>
      <Stack space={2} px={4} py={5}>
        <Center>
          <Heading color="coolGray.800" size="lg">Hi {visitorDetails.name}</Heading>
        </Center>
        {showQrCode && (
          <VStack space={1}>
            <Heading color="coolGray.600" size="md">Visitor QR Code</Heading>
            <Box variant={'card'}>
              <HStack space={4}>
                <Box variant={'card'}>
                  <Pressable variant={'card'} onPress={toggleFullScreen}>
                    <QRCode value={JSON.stringify(visitorDetails)} size={70} />
                  </Pressable>
                </Box>
                <Divider orientation="vertical" right={2} />
                <Stack right={4}>
                  <Heading size={'md'}>{visitorDetails.name}</Heading>
                  <HStack>
                    <Text >Meeting: {visitorDetails.meeting}</Text>
                    <Text left={1} fontSize={10}>({visitorDetails.company})</Text>
                  </HStack>
                  <Text>Date: {visitorDetails.date}</Text>
                  <Text>Location: {visitorDetails.address}</Text>
                </Stack>
              </HStack>
            </Box>
          </VStack>
        )}
        <Modal isOpen={isFullScreen} onClose={toggleFullScreen} size="full" px={3}>
          <Modal.Content>
            <Modal.CloseButton />
            <Modal.Body>
              <Center flex={1}>
                <QRCode value={JSON.stringify(visitorDetails)} size={290} />
              </Center>
            </Modal.Body>
          </Modal.Content>
        </Modal>
        <Stack space={3}>
          <Stack>
            {attendanceData ? (
              <AttendanceCard data={attendanceData} />
            ) : (
              <Text>Check In/Out</Text>
            )}
          </Stack>
          <Heading color="coolGray.600" size="md" top={2}>Past Tickets</Heading>
          {isLoading ? (
            <Text>Loading...</Text>
          ) : pastTickets.length > 0 ? (
            <FlatList
              data={pastTickets}
              renderItem={({ item }) => (
                <Box px={1} py={1}>
                  <TicketCard data={item} onDelete={handleDeleteVisitor} />
                </Box>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          ) : (
            <Center>
              <Text>No past tickets</Text>
            </Center>
          )}
        </Stack>
      </Stack>
      <Fab
        onPress={() => navigation.navigate('Qr Code Scanner')}
        position="absolute"
        size="sm"
        icon={<Icon as={AntDesign} name="scan1" size="sm" color="white" />}
        bottom={5} right={5}
      />
    </Box>
  );
};

const mapStateToProps = (state) => ({
  visitorList: state.admin.visitorList,
  visitorData: state.admin.visitorData,
  checkInData: state.admin.checkInData,
  checkOutData: state.admin.checkOutData,
});

const mapDispatchToProps = {
  getQrCode,
  fetchVisitorData,
  getVisitorList,
  deleteVisitorById
};

export default connect(mapStateToProps, mapDispatchToProps)(UserHomeScreen);
