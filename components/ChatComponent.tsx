import { View, Text, Pressable, Box, HStack, Heading, VStack, Spacer } from "native-base";
import React, { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { ChatMessage, ChatRoom, User } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "react-native";

const ChatComponent = ({ chatRoom, navigation, refreshing }: { chatRoom: ChatRoom, navigation: any, refreshing: any }) => {
    const [message, setMessage] = useState<ChatMessage>();
    const [loggedInUser, setLoggedInUser] = useState<User>();
    const [chatRoomName, setChatRoomName] = useState<string>("");
    const colorScheme = useColorScheme();

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
    }, [refreshing]);


    const handleNavigation = () => {
        navigation.navigate("MessageTab", {
            id: chatRoom.id,
            name: chatRoomName,
            loggedInUser: loggedInUser
        });
    };

    return (
        <Pressable onPress={handleNavigation}>
            <Box width={"100%"} rounded="lg" borderColor="#165d31" borderWidth="1" backgroundColor={"white"} shadow={2} marginBottom={2}>
                <HStack p={6} space={2}>
                    <Ionicons name='person-circle-outline' size={50} color='#165d31' />
                    <VStack >
                        <HStack space={6}>
                            <Heading>{chatRoomName}</Heading>
                        </HStack>
                        <HStack space={4}>
                            <Text marginRight={10} numberOfLines={1} ellipsizeMode="tail" >{message?.message ? message.message.length > 10 ? message.message.slice(0, 10) + "..." : message.message : "No messages yet"}</Text>
                            <Spacer />
                            <Text alignSelf="flex-end">{message?.createdAt ? message.createdAt.toString().slice(0, 19).replace('T', ' ') : ""}</Text>
                        </HStack>
                    </VStack>
                </HStack>
            </Box>
        </Pressable>
    );
};

export default ChatComponent;
