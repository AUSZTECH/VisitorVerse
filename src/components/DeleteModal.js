import { Button, HStack, Modal, Spinner, Stack, Text } from 'native-base'
import React from 'react'

const DeleteModal = ({ open, label, loading, onDelete, onCancel }) => {
    return (
        <Modal isOpen={open} >
            {!loading ? (
                <Modal.Content>
                    <Modal.Header>{'Delete ' + label}</Modal.Header>
                    <Modal.Body>
                        <Stack space={4} >
                            <Text>Are you sure, You want to delete this {label}?</Text>
                            <HStack justifyContent={'space-evenly'} >
                                <Button colorScheme={'error'} variant={'outline'} width={75} onPress={onDelete} >Yes</Button>
                                <Button colorScheme={'info'} variant={'outline'} width={75} onPress={onCancel} >No</Button>
                            </HStack>
                        </Stack>
                    </Modal.Body>
                </Modal.Content>
            ) : (
                <Spinner />
            )}
        </Modal>
    )
}

export default DeleteModal