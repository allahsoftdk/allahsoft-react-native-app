import React, { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { View, Text, Pressable, FlatList, Box, Heading, HStack, Center, Stack } from "native-base";
import ChatComponent from "../components/ChatComponent";
import axiosInstance from "../utils/axios";
import { ChatRoom } from "../types";
import { useFocusEffect } from "@react-navigation/native";
import { useColorScheme } from "react-native";


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
        <Center>
            <Box alignItems="center">
                <Stack p="4" space={3}>
                    <HStack alignItems='center' justifyContent='space-between' >
                        <Heading fontSize={"3xl"} style={{ color: colorScheme === 'dark' ? 'white' : 'black' }} >Chat</Heading>
                    </HStack>

                    {/* <Stack p="4" space={3}> */}
                    {rooms.length > 0 ? (
                        <FlatList data={rooms} renderItem={({ item }) =>
                            <ChatComponent chatRoom={item} navigation={navigation} />} keyExtractor={(item: ChatRoom) => item.id}
                        />

                    ) : (
                        <HStack >
                            <Text >No rooms created!</Text>
                            <Text>Go to a user profile and start a chat</Text>
                        </HStack>
                    )}
                    {/* </Stack> */}
                </Stack>
            </Box>
        </Center>
    )
};

export default Chat;