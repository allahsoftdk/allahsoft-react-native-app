import { View, Text, Pressable, Box, HStack, Heading } from "native-base";
import React, { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { ChatMessage, ChatRoom, User } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "react-native";

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

    const colorScheme = useColorScheme();
    return (
        <Pressable onPress={handleNavigation}>
            <Box width={"300"} rounded="lg" overflow="hidden" borderColor="#165d31" borderWidth="1" backgroundColor={"white"}>
                <HStack p={6}>
                    <Ionicons name='person-circle-outline' size={50} color='#165d31' />
                    <View>
                        <Heading>{chatRoomName}</Heading>
                        <Text>{message?.message ? message.message : "No messages yet"}</Text>
                    </View>
                    <View>
                        <Text>{message?.createdAt ? message.createdAt.toString().slice(0, 19).replace('T', ' ') : ""}</Text>
                    </View>
                </HStack>
            </Box>
        </Pressable>
    );
};

export default ChatComponent;
