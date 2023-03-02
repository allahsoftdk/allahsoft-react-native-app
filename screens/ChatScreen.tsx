import React, { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { View, Text, Pressable, SafeAreaView, FlatList } from "react-native";
import { Feather } from "@expo/vector-icons";
import ChatComponent from "../components/ChatComponent";
import { chatStyles } from "../styles/chatStyles";

import Navigation from "../navigation";
import axiosInstance from "../utils/axios";
import socket from "../utils/socket";
import { ChatRoom } from "../types";
import { useFocusEffect } from "@react-navigation/native";
import checkLoggedIn from "../utils/checkLogIn";
import { Box, Button, Center } from "native-base";
import { globalStyles } from "../styles/globalStyles";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";


const Chat = ({ navigation }: { navigation: any }) => {
    const colorScheme = useColorScheme();
    const [rooms, setRooms] = useState<ChatRoom[]>([]);

    useFocusEffect(
        useCallback(() => {
            axiosInstance.get("/api/chatRoom/loggedInUser").then((res) => {
                setRooms(res.data);
            }).catch((err) => {
                console.log(err);
            });
        }, [])
    );

    return (
        <SafeAreaView style={chatStyles.chatscreen}>
            <View style={chatStyles.chattopContainer}>
                <View style={chatStyles.chatheader}>
                    <Text style={chatStyles.chatheading}>Chats</Text>
                </View>
            </View>

            <View style={chatStyles.chatlistContainer}>
                {rooms.length > 0 ? (
                    <FlatList
                        data={rooms}
                        renderItem={({ item }) => <ChatComponent chatRoom={item} navigation={navigation} />}
                        keyExtractor={(item: ChatRoom) => item.id}
                    />
                ) : (
                    <View style={chatStyles.chatemptyContainer}>
                        <Text style={chatStyles.chatemptyText}>No rooms created!</Text>
                        <Text>Go to a user profile and start a chat</Text>
                    </View>
                )}
            </View>
        </SafeAreaView>
    )
};

export default Chat;