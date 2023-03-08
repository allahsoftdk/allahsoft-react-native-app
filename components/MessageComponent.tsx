import { View, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { chatStyles } from "../styles/chatStyles";
import { ChatMessage, User } from "../types";
import { useColorScheme } from "react-native";

export default function MessageComponent({ item, user }: { item: ChatMessage; user: User }) {
    const status = item.userId !== user.id;
    const colorScheme = useColorScheme();

    return (
        <View >
            <View
                style={
                    status
                        ? chatStyles.mmessageWrapper
                        : [chatStyles.mmessageWrapper, { alignItems: "flex-end" }]
                }
            >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Ionicons
                        name='person-circle-outline'
                        size={30}
                        color={colorScheme === "dark" ? "white" : "black"}
                        style={chatStyles.mvatar}
                    />
                    <View
                        style={
                            status
                                ? chatStyles.mmessage
                                : [chatStyles.mmessage, { backgroundColor: "rgb(194, 243, 194)" }]
                        }
                    >
                        <Text>{item.message}</Text>
                    </View>
                </View>
                <Text style={{ marginLeft: 40, color: colorScheme === "dark" ? "white" : "black" }} >{item.createdAt.toString().slice(0, 16).replace('T', ' ')}</Text>
            </View>
        </View>
    );
}
