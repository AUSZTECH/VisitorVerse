import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import {
  Box, Center, Heading, HStack, Stack, Pressable, Icon, Button, Text, VStack, Toast
} from 'native-base';
import QRCode from 'react-native-qrcode-svg';
import { Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { getTicketData, deleteVisitorById, } from '../../../../../redux/actions/adminActions';
import DeleteModal from '../../../../../components/DeleteModal';
import Share from 'react-native-share';
import ViewShot from 'react-native-view-shot';

const VisitorTicket = ({ route, visitorData, getTicketData }) => {
  const navigation = useNavigation();
  const [visitorDetails, setVisitorDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const ticketRef = useRef();

  useEffect(() => {
    if (route.params?.visitorData) {
      setVisitorDetails(route.params.visitorData);
    } else if (typeof visitorData === 'string') {
      setVisitorDetails(JSON.parse(visitorData));
    } else if (typeof visitorData === 'object') {
      setVisitorDetails(visitorData);
    }
  }, [route.params?.visitorData, visitorData]);

  const onDelete = async () => {
    setLoading(true);
    try {
      await deleteVisitorById(visitorData.id);
      console.log(visitorData, 'deleted')
      navigation.navigate('CheckInOut');
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setShowDeleteModal(false);
    }
  };

  const onShare = async () => {
    try {
      const uri = await ticketRef.current.capture();
      await Share.open({
        url: `file://${uri}`,
        type: 'image/jpeg',
      });
      Alert.alert(
        "Share Success",
        "Ticket shared successfully",
        [
          {
            text: "OK",
            onPress: () => navigation.navigate('CheckInOut')
          }
        ]
      );
    } catch (error) {
      if (error.message === 'User did not share' || error.code === 'ECANCELLED') {
        Alert.alert(
          "Share Successfull",
          "Ticket shared successfully",
          [
            {
              text: "OK",
              onPress: () => navigation.navigate('CheckInOut')
            }
          ]
        );
      } else {
        console.error('Error sharing', error);
        Alert.alert("Share Success", "Ticket shared successfully");
      }
    }
  };


  return (
    <Box variant={'container'} px={3} py={7}>
      <Stack space={5}>
        <VStack space={2}>

          <Pressable onPress={onShare}>
            <Center>
              <Icon as={Ionicons} name='share-social' color={'#e33d0f'} />
              <Text>Share</Text>
            </Center>
          </Pressable>

          <ViewShot ref={ticketRef} options={{ format: "jpg", quality: 0.9 }}>
            <Box variant={'card'}>
              <Stack space={3}>
                <Center>
                  <Heading>{visitorDetails.name}</Heading>
                  <Text>{visitorDetails.email}</Text>
                </Center>
                <Center>
                  <Box variant={'card'}>
                    <QRCode value={JSON.stringify(visitorDetails)} size={260} />
                  </Box>
                </Center>
                <Stack space={4}>
                  <Stack >
                    <Text >Code: {visitorDetails.code}</Text>
                    <HStack>
                      <Text >Meeting: {visitorDetails.meeting}</Text>
                      <Text left={1}>({visitorDetails.company})</Text>
                    </HStack>
                    <Text>Date: {visitorDetails.date}</Text>
                    <Text>Location: {visitorDetails.address},{visitorDetails.city}</Text>
                    <Text>Phone: {visitorDetails.phone}</Text>
                  </Stack>
                </Stack>
              </Stack>
            </Box>
          </ViewShot>

        </VStack>
        <Stack space={8}>
          <HStack justifyContent={'space-between'} top={4}>
            <Button width={'48%'} variant={'subtle'}>Print</Button>
            <Button width={'48%'} variant={'subtle'}>Download</Button>
          </HStack>

          <Button
            variant={'subtle'}
            colorScheme={'error'}
            onPress={() => setShowDeleteModal(true)}
          >
            Delete Ticket
          </Button>

          <DeleteModal
            open={showDeleteModal}
            label={'Ticket'}
            loading={loading}
            onDelete={onDelete}
            onCancel={() => setShowDeleteModal(false)}
          />
        </Stack>
      </Stack>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  visitorData: state.admin.visitorData,
});

const mapDispatchToProps = (dispatch) => ({
  getTicketData: () => dispatch(getTicketData()),
  deleteVisitorById
});

export default connect(mapStateToProps, mapDispatchToProps)(VisitorTicket);
