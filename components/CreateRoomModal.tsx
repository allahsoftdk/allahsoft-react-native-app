import { View, Text, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import { chatStyles } from "../styles/chatStyles";

import socket from "../utils/socket";
import axiosInstance from "../utils/axios";

const CreateRoomModal = ({ setVisible }: { setVisible: any }) => {
    const [groupName, setGroupName] = useState("");

    //👇🏻 Function that closes the Modal component
    const closeModal = () => setVisible(false);

    //👇🏻 Logs the group name to the console
    const handleCreateRoom = () => {
        axiosInstance.post("/api/chatRoom", { name: groupName }).then((res) => {
        }).catch((err) => {
            console.log(err);
        });
        closeModal();
    };
    return (
        <View style={chatStyles.modalContainer}>
            <Text style={chatStyles.modalsubheading}>Enter the names of the people you want to chat with</Text>
            <TextInput
                style={chatStyles.modalinput}
                placeholder='person1, person2, person3'
                onChangeText={(text) => setGroupName(text)}
            />

            <View style={chatStyles.modalbuttonContainer}>
                <Pressable style={chatStyles.modalbutton} onPress={handleCreateRoom}>
                    <Text style={chatStyles.modaltext}>CREATE</Text>
                </Pressable>
                <Pressable
                    style={[chatStyles.modalbutton, { backgroundColor: "#E14D2A" }]}
                    onPress={closeModal}
                >
                    <Text style={chatStyles.modaltext}>CANCEL</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default CreateRoomModal;
