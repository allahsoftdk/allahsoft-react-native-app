import React from "react";
import { Button, Modal, FormControl, Input, Center, NativeBaseProvider } from "native-base";
import { useState } from "react";
import { Post } from "../types";
import axiosInstance from "../utils/axios";
import { globalStyles } from "../styles/globalStyles";
import { Keyboard } from 'react-native';

const EditPostModal = ({ post, onRefresh }: { post: Post, onRefresh: () => void }) => {
    const [showModal, setShowModal] = useState(false);
    const [description, setDescription] = useState("");

    const editPost = (post: Post) => {
        axiosInstance.put("/api/post/" + post.id, { description: description }).then((res) => {
            Keyboard.dismiss();
            setShowModal(false);
            onRefresh();
        }).catch((err) => {
            console.log(err);
        });
    };

    return <Center>
        <Button onPress={() => setShowModal(true)} style={globalStyles.greenColor} size="sm" variant="solid" position="absolute" right="0" top="0" zIndex={1}> Edit </Button>
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
            <Modal.Content maxWidth="400px">
                <Modal.CloseButton />
                <Modal.Header>Edit Post</Modal.Header>
                <Modal.Body>
                    <FormControl>
                        <FormControl.Label>Thoughts</FormControl.Label>
                        <Input
                            onChangeText={(text) => setDescription(text)}
                            value={description}
                            placeholder="What's on your mind?"
                            multiline={true}
                            numberOfLines={4}
                            textAlignVertical="top"
                        />
                    </FormControl>
                </Modal.Body>
                <Modal.Footer>
                    <Button.Group variant="ghost" space={2}>
                        <Button onPress={() => setShowModal(false)}>Cancel</Button>
                        <Button onPress={() => editPost(post)}>Save</Button>
                    </Button.Group>
                </Modal.Footer>
            </Modal.Content>
        </Modal>
    </Center>;
};

export default ({ post, onRefresh }: { post: Post, onRefresh: () => void }) => {
    return (
        <NativeBaseProvider>
            <Center flex={1} px="3">
                <EditPostModal post={post} onRefresh={onRefresh} />
            </Center>
        </NativeBaseProvider>
    );
};
