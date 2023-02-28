import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, Text, Pressable, SafeAreaView, FlatList } from "react-native";
import { Feather } from "@expo/vector-icons";
import ChatComponent from "../components/ChatComponent";
import { chatStyles } from "../styles/chatStyles";

import CreateRoomModal from "../components/CreateRoomModal";
import Navigation from "../navigation";
import axiosInstance from "../utils/axios";
import socket from "../utils/socket";
import { ChatRoom } from "../types";
import { useFocusEffect } from "@react-navigation/native";
import checkLoggedIn from "../utils/checkLogIn";
import { Box, Button, Center } from "native-base";
import { globalStyles } from "../styles/globalStyles";
import { useColorScheme } from "react-native";


const Chat = ({ navigation }: { navigation: any }) => {
    const colorScheme = useColorScheme();
    const [visible, setVisible] = useState(false);
    const [rooms, setRooms] = useState<ChatRoom[]>([]);
    const [loggedIn, setLoggedIn] = React.useState(false);

    // run checkLoggedIn on navigation
    useFocusEffect(
        React.useCallback(() => {
            let isActive = true;
            const check = async () => {
                await checkLoggedIn(setLoggedIn);
            };
            if (isActive) {
                check();
            }
            return () => {
                isActive = false;
            };
        }, [])
    );

    useLayoutEffect(() => {
        axiosInstance.get("/api/chatRoom").then((res) => {
            setRooms(res.data);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    useEffect(() => {
        socket.on("roomsList", (data: ChatRoom[]) => {
            setRooms(data)
        });
    }, [socket]);

    return loggedIn ? (
        <SafeAreaView style={chatStyles.chatscreen}>
            <View style={chatStyles.chattopContainer}>
                <View style={chatStyles.chatheader}>
                    <Text style={chatStyles.chatheading}>Chats</Text>

                    <Pressable onPress={() => setVisible(true)}>
                        <Feather name='edit' size={24} color='green' />
                    </Pressable>
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
                        <Text>Click the icon above to create a Chat room</Text>
                    </View>
                )}
            </View>
            {visible ? <CreateRoomModal setVisible={setVisible} /> : ""}
        </SafeAreaView>
    ) : (
        <Center flex={1}>
            <Box
                bg={colorScheme === "dark" ? "gray.800" : "white"}
                rounded="lg"
                shadow={1}
                width="70%"
                height="20%"
                justifyContent="center"
                alignItems="center"
            >
                <Button
                    onPress={() => navigation.navigate("LoginTab")}
                    style={globalStyles.greenColor}

                >
                    To access this page, please log in
                </Button>
            </Box>
        </Center>
    );
};

export default Chat;