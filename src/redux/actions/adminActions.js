import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  CHECK_IN,
  CHECK_OUT,
  GET_QR_CODE,
  GET_TICKET,
  PAST_TICKETS_LIST,
  CHECK_IN_OUT_DATA_FETCHED,
  DELETE_VISITOR
} from './actionTypes';


export const createVisitor = (data) => async (dispatch, getState) => {
  const uniqueID = `visitor-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  const formData = new FormData();
  if (data.image) {
    formData.append('files', data.image);
  }
  formData.append('code', data.code);
  data.name && formData.append('Name', data.name);
  data.email && formData.append('Email', data.email);
  data.phone && formData.append('Phone', data.phone);
  data.company && formData.append('Company', data.company);
  data.address && formData.append('Addresses', data.address);
  data.city && formData.append('City', data.city);
  data.meeting && formData.append('MeetingWith', data.meeting);
  data.date && formData.append('Date', data.date);

  try {
    const existingDataString = await AsyncStorage.getItem('VisitorData');
    let existingDataArray = existingDataString ? JSON.parse(existingDataString) : [];

    const newVisitor = {
      id: uniqueID,
      ...data
    };

    existingDataArray.push(newVisitor);

    await AsyncStorage.setItem('VisitorData', JSON.stringify(existingDataArray));
    console.log('Data saved successfully:', newVisitor);

    return newVisitor;
  } catch (error) {
    console.error('Error saving data:', error);
    throw error; 
  }
};



export const getQrCode = (objectId) => async (dispatch) => {
  try {
    const existingDataString = await AsyncStorage.getItem('VisitorData');
    if (existingDataString) {
      const existingData = JSON.parse(existingDataString);
      console.log(existingData, 'Existing');

      if (existingData.length > 0) {
        const lastObject = existingData[existingData.length - 1];

        const lastObjectJson = JSON.stringify(lastObject);

        dispatch({
          type: GET_QR_CODE,
          payload: lastObjectJson,
        });

        console.log('Last data retrieved successfully:', lastObject);
      } else {
        console.error('No data found in AsyncStorage');
      }
    }
  } catch (error) {
    console.error('Error retrieving data from AsyncStorage:', error);
  }
};


export const getVisitorList = () => async (dispatch) => {
  try {
    const existingDataString = await AsyncStorage.getItem('VisitorData');
    if (existingDataString) {
      const visitorList = JSON.parse(existingDataString);
      dispatch({
        type: PAST_TICKETS_LIST,
        payload: visitorList,
      });
      console.log('Data retrieved successfully:', visitorList);
    } else {
      console.error('No visitor data found');
    }
  } catch (error) {
    console.error('Error retrieving data from AsyncStorage:', error);
  }
};


export const getTicketData = () => async (dispatch) => {
  try {
    const dataString = await AsyncStorage.getItem('VisitorData');
    if (dataString) {
      const dataArray = JSON.parse(dataString);

      dispatch({
        type: GET_TICKET,
        payload: dataArray,
      });
    } else {
      console.warn('No data found in AsyncStorage.');
    }
  } catch (error) {
    console.error('Error fetching data from AsyncStorage:', error);
  }
};


export const toggleCheckInCheckOut = (visitorId) => async (dispatch) => {
  try {
    const checkInOutData = await AsyncStorage.getItem('CheckInOutData');
    const storedData = checkInOutData ? JSON.parse(checkInOutData) : {};

    const currentTime = new Date().toISOString();

    if (storedData[visitorId]) {
      if (storedData[visitorId].isCompleted) {
        console.log('This QR code is already marked.');
        return;
      } else {
        storedData[visitorId].checkOutTime = currentTime;
        storedData[visitorId].isCompleted = true;
        dispatch({ type: CHECK_OUT, payload: { visitorId, ...storedData[visitorId] } }); 
      }
    } else {
      storedData[visitorId] = { checkInTime: currentTime, checkOutTime: null, isCompleted: false };
      dispatch({ type: CHECK_IN, payload: { visitorId, ...storedData[visitorId] } });
    }

    await AsyncStorage.setItem('CheckInOutData', JSON.stringify(storedData));
  } catch (error) {
    console.error('Error in toggleCheckInCheckOut:', error);
  }
};




export const fetchVisitorData = (visitorId) => async (dispatch) => {
  try {
    const checkInOutData = await AsyncStorage.getItem('CheckInOutData');
    const storedData = checkInOutData ? JSON.parse(checkInOutData) : {};

    if (storedData[visitorId]) {
      dispatch({ type: CHECK_IN_OUT_DATA_FETCHED, payload: storedData[visitorId] });
    }
  } catch (error) {
    console.error('Error fetching visitor data:', error);
  }
};


export const deleteVisitorById = (visitorId) => async (dispatch) => {
  try {
    const existingDataString = await AsyncStorage.getItem('VisitorData');
    let existingDataArray = existingDataString ? JSON.parse(existingDataString) : [];

    const updatedDataArray = existingDataArray.filter(visitor => visitor.id !== visitorId);

    await AsyncStorage.setItem('VisitorData', JSON.stringify(updatedDataArray));

    console.log('Visitor deleted successfully:', visitorId);
   
  } catch (error) {
    console.error('Error deleting visitor data:', error);

    throw error;
  }
};



