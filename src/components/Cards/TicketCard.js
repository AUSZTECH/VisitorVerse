import React from 'react'

// Native Base
import { Avatar, Badge, Box, Divider, Heading, HStack, Stack, Text, Menu,Icon, IconButton } from 'native-base'
import moment from 'moment'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import { connect } from 'react-redux'
import { deleteVisitorById } from '../../redux/actions/adminActions'
const TicketCard = ({ data, key ,onDelete}) => {



    return (
        <Box variant={'card'} key={key}   >
            <Stack >
                <HStack alignItems={'center'} justifyContent={'space-between'} >
                    <Heading size={'md'} >{data.name}</Heading>
                    <Badge borderRadius={15} colorScheme={!data.checkOutTime ? 'success' : 'error'} >{!data.checkOutTime ? 'Visited' : 'Pending'}</Badge>
                </HStack>
                <HStack space={2} alignItems={'center'} >
                    <Avatar />
                    <Stack>
                        <Text fontSize={20} bold >Date: {data.date}</Text>
                        <Text fontSize={14} bold >Meeting: {data.meeting}</Text>
                    </Stack>
                    <Box left={130} >
                    </Box>
                </HStack>
                        <Menu
                            w={'32'}
                            placement='right'
                            backgroundColor={'primary.50'}
                            trigger={triggerProps => {
                                return <IconButton
                                    icon={<Icon as={Entypo} name={'dots-three-horizontal'} />}
                                    position={'absolute'}
                                    right={0}
                                    top={'70%'}
                                    size={'sm'}
                                    {...triggerProps}
                                />
                            }}
                        >
                            <Menu.Item>Details</Menu.Item>
                            <Menu.Item onPress={() => onDelete(data.id)}>Delete</Menu.Item>
                            <Menu.Item >Share</Menu.Item>
                        </Menu>
               
            </Stack>
        </Box>
    )
}

const mapStateToProps = null;

const mapDispatchToProps = dispatch => ({
    deleteVisitor: (id) => dispatch(deleteVisitorById(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(TicketCard);