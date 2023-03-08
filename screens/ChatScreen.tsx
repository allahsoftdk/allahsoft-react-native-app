import React, { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { View, Text, Pressable, FlatList, Box, Heading, HStack, Center, Stack, VStack } from "native-base";
import ChatComponent from "../components/ChatComponent";
import axiosInstance from "../utils/axios";
import { ChatRoom } from "../types";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { RefreshControl, useColorScheme } from "react-native";


const Chat = ({ navigation }: { navigation: any }) => {
    const colorScheme = useColorScheme();
    const [rooms, setRooms] = useState<ChatRoom[]>([]);
    const [refreshing, setRefreshing] = useState(false);
    const isFocused = useIsFocused();

    useFocusEffect(
        useCallback(() => {
            axiosInstance.get("/api/chatRoom/loggedInUser").then((res) => {
                setRooms(res.data);
            }).catch((err) => {
                console.log(err);
            });
        }, [refreshing])
    );

    // refreshes the component on navigation
    useEffect(() => {
        if (isFocused) {
            onRefresh();
            axiosInstance.get("/api/chatRoom/loggedInUser").then((res) => {
                setRooms(res.data);
            }).catch((err) => {
                console.log(err);
            });
        }
    }, [isFocused]);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 1500);
    }, []);

    return (
        <Center>
            <Box alignItems="center">
                <Stack p="4">
                    <HStack alignItems='center' justifyContent='space-between'>
                        <Heading p={3} paddingTop={6} fontSize={"3xl"} style={{ color: colorScheme === 'dark' ? 'white' : 'black' }} >Chat</Heading>
                    </HStack>

                    <Stack p="4" space={3}>
                        {rooms.length > 0 ? (
                            <FlatList extraData={refreshing} data={rooms} renderItem={({ item }) =>
                                <ChatComponent chatRoom={item} navigation={navigation} refreshing={refreshing} />}
                                keyExtractor={(item: ChatRoom) => item.id}
                                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}
                                />}
                            />

                        ) : (
                            <VStack>
                                <Text fontSize={"2xl"} color={colorScheme === 'dark' ? 'white' : 'black'}>No rooms created!</Text>
                                <Text color={colorScheme === 'dark' ? 'white' : 'black'}>Go to a user profile and start a chat</Text>
                            </VStack>
                        )}
                    </Stack>
                </Stack>
            </Box>
        </Center>
    )
};

export default Chat;