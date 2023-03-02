import { View, Text, Pressable } from "react-native";
import React, { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { chatStyles } from "../styles/chatStyles";

import { ChatMessage, ChatRoom, User } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ChatComponent = ({ chatRoom, navigation }: { chatRoom: ChatRoom, navigation: any }) => {
    const [message, setMessage] = useState<ChatMessage>();
    const [loggedInUser, setLoggedInUser] = useState<User>();
    const [chatRoomName, setChatRoomName] = useState<string>("");

    const getLoggedInUser = async () => {
        try {
            const value = await AsyncStorage.getItem('user');
            if (value !== null) {
                setLoggedInUser(JSON.parse(value));
            }
        } catch (error) {
            console.log(error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            getLoggedInUser();
        }, [])
    );

    useEffect(() => {
        loggedInUser ? setChatRoomName(chatRoom.chatRoomParticipants.filter((participant: any) => participant.id !== loggedInUser.id)[0].name) : chatRoom.name;
    }, [loggedInUser]);

    useLayoutEffect(() => {
        setMessage(chatRoom.chatMessages ? chatRoom.chatMessages[chatRoom.chatMessages.length - 1] : undefined);
    }, []);


    const handleNavigation = () => {
        navigation.navigate("MessageTab", {
            id: chatRoom.id,
            name: chatRoomName,
        });
    };

    return (
        <Pressable style={chatStyles.cchat} onPress={handleNavigation}>
            <Ionicons
                name='person-circle-outline'
                size={45}
                color='black'
                style={chatStyles.cavatar}
            />

            <View style={chatStyles.crightContainer}>
                <View>
                    <Text style={chatStyles.cusername}>{chatRoomName}</Text>

                    <Text style={chatStyles.cmessage}>
                        {message?.message ? message.message : "No messages yet"}
                    </Text>
                </View>
                <View>
                    <Text style={chatStyles.ctime}>
                        {message?.createdAt ? message.createdAt.toString().slice(0, 19).replace('T', ' ') : ""}
                    </Text>
                </View>
            </View>
        </Pressable>
    );
};

export default ChatComponent;
