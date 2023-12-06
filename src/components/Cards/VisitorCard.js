import React from 'react'

// Native Base
import { Avatar, Badge, Box, Divider, Heading, HStack, Stack, Text } from 'native-base'

import moment from 'moment'

const VisitorCard = ({ data, key }) => {


    return (
        <Box variant={'card'} key={key}   >
            <Stack space={2} >
                <HStack alignItems={'center'} justifyContent={'space-between'} >
                    <Heading size={'md'} >{data.Name}</Heading>
                    <Badge borderRadius={15} colorScheme={'secondary'}  >{'Visited'}</Badge>
                </HStack>
                <HStack space={2} alignItems={'center'}>
                    <Avatar />
                    <Stack >
                        <Text fontSize={20} bold >Date: {data.Date}</Text>
                        <Text fontSize={14} bold >Time: {data.StartTime} - {data.EndTime}</Text>
                    </Stack>
                </HStack>
                {data.checkOutTime && (
                    <>
                        <Divider />
                        <HStack space={2} >
                            <Avatar />
                            <Stack>
                                <Text fontSize={24} bold >{moment(data.checkOutTime).format('hh:mm')}</Text>
                            </Stack>
                        </HStack>
                    </>
                )}
            </Stack>
        </Box>
    )
}

export default VisitorCard