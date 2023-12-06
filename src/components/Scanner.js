'use strict';

// React
import React, { useState } from 'react';

// React-native
import {
    StyleSheet,
    Alert,
    ActivityIndicator, 
} from 'react-native';

// Native Base
import {
    Box,
    Center
} from 'native-base';

// QR Scanner
import QRCodeScanner from 'react-native-qrcode-scanner';

// Camera
import { RNCamera } from 'react-native-camera';

// React Navigation
import { useNavigation } from '@react-navigation/native';

// Icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import BackHeader from './BackHeader';

const QrCodeScanner = ({onScanComplete}) => {
    const navigation = useNavigation();

    const [isScanned, setIsScanned] = useState(false);
    const [scanningInProgress, setScanningInProgress] = useState(false); 


    const onSuccess = e => {
        setScanningInProgress(true);
    
        if (typeof e.data === 'string') {
            setTimeout(() => {
                onScanComplete(e.data)
                console.log('Scanned Success' , e.data);
                setScanningInProgress(false); 
            }, 2000);
        } else {
            Alert.alert('Error', 'Data is wrong');
            setScanningInProgress(false); 
        }
    };
    

    return (
        <Box flex={1} top={5}>
            {scanningInProgress ? (
                
                <Center top={380}>
                    <ActivityIndicator size="large" color="#34aa99"/>
                </Center>
            ) : (
                <QRCodeScanner
                    onRead={onSuccess}
                    flashMode={RNCamera.Constants.FlashMode.off}
                    cameraStyle={styles.camera}
                    cameraProps={{ captureAudio: false }}
                    fadeIn={true}
                    reactivate={true}
                    topContent={
                        
                            <BackHeader>Scan Qr Code</BackHeader>

                        
                    }
                />
            )}
            <Box style={styles.overlay}>
                <Box style={[styles.overlayCorner, styles.topLeftCorner, isScanned && styles.scannedBorderColor]} />
                <Box style={[styles.overlayCorner, styles.topRightCorner, isScanned && styles.scannedBorderColor]} />
                <Box style={[styles.overlayCorner, styles.bottomLeftCorner, isScanned && styles.scannedBorderColor]} />
                <Box style={[styles.overlayCorner, styles.bottomRightCorner, isScanned && styles.scannedBorderColor]} />
            </Box>
        </Box>
    );
}

const overlayColor = 'rgba(0,0,0,0.5)';
const overlaySide = 50;

const styles = StyleSheet.create({
    
    camera: {
        top: '5%',
        height: '95%',
        // backgroundColor: '#111'
    },
    scannedBorderColor: {
        borderColor: 'green',
    },
    overlay: {
        position: 'absolute',
        top: '2%',
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    overlayCorner: {
        position: 'absolute',
        width: overlaySide,
        height: overlaySide,
        borderColor: '#FFF',
        borderWidth: 4,
    },
    topLeftCorner: {
        top: '30%',
        left: '10%',
        borderRightWidth: 0,
        borderBottomWidth: 0,
        borderTopStartRadius:15
    },
    topRightCorner: {
        top: '30%',
        right: '10%',
        borderLeftWidth: 0,
        borderBottomWidth: 0,
        borderTopEndRadius:15
    },
    bottomLeftCorner: {
        bottom: '30%',
        left: '10%',
        borderRightWidth: 0,
        borderTopWidth: 0,
        borderBottomStartRadius:15
    },
    bottomRightCorner: {
        bottom: '30%',
        right: '10%',
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderBottomEndRadius:15
    },
});

export default QrCodeScanner;



// const onSuccess = async e => {
//     setScanningInProgress(true);

//     if (typeof e.data === 'string') {
//         const scannedData = JSON.parse(e.data);
        
//         if (scannedData.type === 'check-in') {
//             dispatch(checkInAction(scannedData));
//             await AsyncStorage.setItem('checkInData', JSON.stringify(scannedData));
//         } else if (scannedData.type === 'check-out') {
//             dispatch(checkOutAction(scannedData));
//             await AsyncStorage.setItem('checkOutData', JSON.stringify(scannedData));
//         }

//         console.log('Scanned Success');
//         onScanComplete(scannedData);
//         setScanningInProgress(false);
//     } else {
//         Alert.alert('Error', 'Invalid QR Code');
//         setScanningInProgress(false);
//     }
// };
