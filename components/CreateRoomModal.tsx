import { View, Text, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import { styles } from "../utils/chatStyles";

import socket from "../utils/socket";
import axiosInstance from "../utils/axios";

const CreateRoomModal = ( {setVisible}: {setVisible: any} ) => {
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
        <View style={styles.modalContainer}>
            <Text style={styles.modalsubheading}>Enter the names of the people you want to chat with</Text>
            <TextInput
                style={styles.modalinput}
                placeholder='person1, person2, person3'
                onChangeText={(text) => setGroupName(text)}
            />  

            <View style={styles.modalbuttonContainer}>
                <Pressable style={styles.modalbutton} onPress={handleCreateRoom}>
                    <Text style={styles.modaltext}>CREATE</Text>
                </Pressable>
                <Pressable
                    style={[styles.modalbutton, { backgroundColor: "#E14D2A" }]}
                    onPress={closeModal}
                >
                    <Text style={styles.modaltext}>CANCEL</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default CreateRoomModal;
