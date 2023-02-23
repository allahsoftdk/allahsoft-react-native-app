import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, Text, Pressable, SafeAreaView, FlatList } from "react-native";
import { Feather } from "@expo/vector-icons";
import ChatComponent from "../components/ChatComponent";
import { styles } from "../utils/chatStyles";

import CreateRoomModal from "../components/CreateRoomModal";
import Navigation from "../navigation";
import axiosInstance from "../utils/axios";
import socket from "../utils/socket";
import { ChatRoom } from "../types";


const Chat = ({ navigation }: { navigation: any }) => {
    const [visible, setVisible] = useState(false);
    const [rooms, setRooms] = useState<ChatRoom[]>([]);

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

    return (
        <SafeAreaView style={styles.chatscreen}>
            <View style={styles.chattopContainer}>
                <View style={styles.chatheader}>
                    <Text style={styles.chatheading}>Chats</Text>

                    <Pressable onPress={() => setVisible(true)}>
                        <Feather name='edit' size={24} color='green' />
                    </Pressable>
                </View>
            </View>

            <View style={styles.chatlistContainer}>
                {rooms.length > 0 ? (
                    <FlatList
                        data={rooms}
                        renderItem={({ item }) => <ChatComponent chatRoom={item} navigation={navigation} />}
                        keyExtractor={(item: ChatRoom) => item.id}
                    />
                ) : (
                    <View style={styles.chatemptyContainer}>
                        <Text style={styles.chatemptyText}>No rooms created!</Text>
                        <Text>Click the icon above to create a Chat room</Text>
                    </View>
                )}
            </View>
            {visible ? <CreateRoomModal setVisible={setVisible} /> : ""}
        </SafeAreaView>
    );
};

export default Chat;