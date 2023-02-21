import { View, Text, Pressable } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../utils/chatStyles";

import { ChatMessage, ChatRoom } from "../types";

const ChatComponent = ({ chatRoom, navigation }: {chatRoom: ChatRoom, navigation: any}) => {
    const [message, setMessage] = useState<ChatMessage>();

    //👇🏻 Retrieves the last message in the array from the item prop, if it exists, else sets it to an empty string
    useLayoutEffect(() => {
        setMessage(chatRoom.chatMessages ? chatRoom.chatMessages[chatRoom.chatMessages.length - 1] : undefined);
    }, []);

    ///👇🏻 Navigates to the Messaging screen
    const handleNavigation = () => {
        navigation.navigate("MessageTab", {
            id: chatRoom.id,
            name: chatRoom.name,
        });
    };

    return (
        <Pressable style={styles.cchat} onPress={handleNavigation}>
            <Ionicons
                name='person-circle-outline'
                size={45}
                color='black'
                style={styles.cavatar}
            />

            <View style={styles.crightContainer}>
                <View>
                    <Text style={styles.cusername}>{chatRoom.name}</Text>

                    <Text style={styles.cmessage}>
                        {message?.message ? message.message : "No messages yet"}
                    </Text>
                </View>
                <View>
                    <Text style={styles.ctime}>
                        {message?.createdAt ? message.createdAt.toString().slice(0, 19).replace('T', ' ') : ""}
                    </Text>
                </View>
            </View>
        </Pressable>
    );
};

export default ChatComponent;
