import React from 'react'

// Native Base
import { Avatar, Badge, Box, Heading, HStack, Stack, Text } from 'native-base'
import moment from 'moment'

const WalkInCard = ({ data, index }) => {

    console.log(data)
    return (
        <Box mt={2} variant={'card'} px={2}>
            <HStack space={2} alignItems={'center'} >
                <Avatar />
                <Stack>
                    <HStack  alignItems={'center'} justifyContent={'space-between'}  >
                        <Heading size={'sm'} fontSize={18} >{data.Name}</Heading>
                    </HStack>
                    <Text fontSize={14} bold >Time: {data.StartTime} - {data.EndTime}</Text>
                    <Text fontSize={12} >Date: {moment(data.Date).format("DD-MM-YYYY")}</Text>
                </Stack>
            </HStack>
            <Stack
                position={'absolute'}
                top={2}
                right={2}
                justifyContent={'space-between'}
            >
                <Badge borderRadius={'15'} colorScheme={'secondary'} >{`Walk-In`}</Badge>
            </Stack>
        </Box>
    )
}

export default WalkInCard