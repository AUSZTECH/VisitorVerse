import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Box, Center, Text, Stack } from 'native-base';
import QRCode from 'react-native-qrcode-svg';
import { connect } from 'react-redux';
import { getQrCode } from '../../../../redux/actions/adminActions';
import BackHeader from '../../../../components/BackHeader';


const QrCodeScreen = (props) => {

    const { getQrCode, visitorData } = props

    const [loading, setLoading] = useState(false)

    

    useEffect(() => {
        loadData()
    }, []);

    const loadData = async () => {
        setLoading(true)
        try {
            await getQrCode()
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    // const visitorDataJson = JSON.stringify(visitorData);

    return (
        <Box variant={'container'} px={5}>
            <Stack space={5}>
                <BackHeader>Qr Code</BackHeader>
                <Stack backgroundColor={'white'} borderRadius={15} shadow={2} height={'70%'} py={6}>
                    <Center top={5}>
                        <>
                            <QRCode value={visitorData} size={290} />
                            <Text py={3}>Scan this Qr Code to Get Ticket!</Text>
                        </>
                    </Center>
                </Stack>
            </Stack>
        </Box>
    );
};

const mapStateToProps = (state) => {
    return {
        visitorData: state.admin.visitorData
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getQrCode: () => dispatch(getQrCode()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(QrCodeScreen);

