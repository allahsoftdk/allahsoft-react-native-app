import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { View, TextInput, Text, FlatList, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MessageComponent from "../components/MessageComponent";
import { chatStyles } from "../styles/chatStyles";
import socket from "../utils/socket";
import axiosInstance from "../utils/axios";
import { ChatMessage, ChatRoom, User } from "../types";
import { Keyboard } from "react-native";
import { ScrollView } from "native-base";

const MessagingScreen = ({ route, navigation }: { route: any, navigation: any }) => {
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
    const [message, setMessage] = useState("");
    const [user, setUser] = useState<User>({} as User);
    const scrollViewRef = useRef<FlatList>(null);

    const { name, id, loggedInUser } = route.params;

    useLayoutEffect(() => {
        navigation.setOptions({ title: name });
        setUser(loggedInUser);
        socket.emit("findRoom", id);
    }, []);

    useEffect(() => {
        socket.on("roomFound", (data: ChatRoom) => {
            setChatMessages(data.chatMessages);
        });
        socket.on("messageCreated", (data: ChatMessage) => {
            setChatMessages((prev) => [...prev, data]);
        });
    }, [socket]);

    const handleNewMessage = () => {
        socket.emit("newMessage", {
            message: message,
            chat_room_id: id,
            user_id: user.id
        });

        setMessage("");
    };

    return (
        <View style={chatStyles.messagingscreen}>
            <View
                style={[
                    chatStyles.messagingscreen,
                    { paddingVertical: 15, paddingHorizontal: 10 },
                ]}
            >
                {chatMessages[0] ? (
                    <FlatList
                        ref={scrollViewRef}
                        onContentSizeChange={() =>
                            scrollViewRef.current?.scrollToEnd({ animated: false })
                        }
                        nestedScrollEnabled
                        data={chatMessages}
                        renderItem={({ item }) => (
                            <MessageComponent item={item} user={user} />
                        )}
                        keyExtractor={(item) => item.id.toString()}
                    />
                ) : (
                    ""
                )}
            </View>

            <View style={chatStyles.messaginginputContainer}>
                <TextInput
                    style={chatStyles.messaginginput}
                    onChangeText={(value) => setMessage(value)}
                    value={message}
                />
                <Pressable
                    style={chatStyles.messagingbuttonContainer}
                    onPress={handleNewMessage}
                >
                    <View>
                        <Text style={{ color: "#f2f0f1", fontSize: 20 }}>SEND</Text>
                    </View>
                </Pressable>
            </View>
        </View>
    );
};

export default MessagingScreen;
