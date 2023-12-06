
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Image,
  ScrollView,
  Stack,
  Text,
  useToast,
} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import { connect, useDispatch } from 'react-redux';
import { getVisitorList } from '../../../../redux/actions/adminActions';
import VisitorCard from '../../../../components/Cards/VisitorCard';
import { VisitorData } from '../../../../assets/MockData/mockData';

const HomeScreen = ({visitorList}) => {
  const dispatch = useDispatch()
  const toast = useToast();
  const navigation = useNavigation();
  const date = new Date();
  const currDate = moment(date).format('DD MMMM Y');
  const [data, setData] = useState(VisitorData);
  const [isLoading, setIsLoading] = useState(false);
  const [pastTickets, setPastTickets] = useState([]); 

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const visitors = await getVisitorList(); 
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteVisitor = (visitorId) => {
    
  };

  return (
    <Box variant='container'>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Stack space={5} mx={4}>
          <Center top={12}>
            <Image
              source={require('../../../../assets/Images/VisitorLogo.png')}
              height={200}
              width={350}
              resizeMode={'contain'}
              alt={'Logo'}
            />
          </Center>

          <Stack space={4}>
            <HStack justifyContent={'space-between'} alignItems={'center'}>
              <Heading size={'md'}>Visitors</Heading>
              <Text>{currDate}</Text>
            </HStack>
            <Box>
              <Center>
                <HStack>
                  <Stack alignItems="center" space={2}>
                    <Button
                      shadow={2}
                      width={'75%'}
                      variant="subtle"
                      bg="#fff"
                      _text={{ color: '#4866b1', fontWeight: 'bold', fontSize: '4xl' }}
                      size="lg"
                      startIcon={<FontAwesome name={'user-plus'} color={'#4866b1'} size={40} />}
                      onPress={() => navigation.navigate('Walk In Visitor')}
                    >
                      11
                    </Button>
                    <Text fontSize="xs" fontWeight="bold">Walk-In Visitors</Text>
                  </Stack>

                  <Stack alignItems="center" space={2}>
                    <Button
                      width={'75%'}
                      variant="subtle"
                      bg="#fff"
                      shadow={2}
                      _text={{ color: '#34aa99', fontWeight: 'bold', fontSize: '4xl' }}
                      size="lg"
                      startIcon={<FontAwesome name={'user-secret'} color={'#34aa99'} size={40} />}
                      onPress={() => navigation.navigate('Pre-Registered Visitor')}
                    >
                      10
                    </Button>
                    <Text fontSize="xs" fontWeight="bold">Pre-Registered Visitors</Text>
                  </Stack>
                </HStack>
              </Center>
            </Box>
          </Stack>

          <Heading color="coolGray.600" size="md" top={2}>Today TimeLine</Heading>
          {isLoading ? (
            <Text>Loading...</Text>
          ) : visitorList.length > 0 ? (
            <FlatList
              data={visitorList}
              renderItem={({ item }) => (
                <Box px={1} py={1}>
                  <VisitorCard data={item} onDelete={() => handleDeleteVisitor(item.id)} />
                </Box>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          ) : (
            <Center>
              <Text>No Today TimeLine</Text>
            </Center>
          )}
        </Stack>
      </ScrollView>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  visitorList: state.admin.visitorList,
});

const mapDispatchToProps = {
  getVisitorList,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

