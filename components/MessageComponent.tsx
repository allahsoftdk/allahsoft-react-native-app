import { View, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { chatStyles } from "../styles/chatStyles";

export default function MessageComponent({ item, user }: { item: any; user: any }) {
    const status = item.user !== user;

    return (
        <View>
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
                        color='black'
                        style={chatStyles.mvatar}
                    />
                    <View
                        style={
                            status
                                ? chatStyles.mmessage
                                : [chatStyles.mmessage, { backgroundColor: "rgb(194, 243, 194)" }]
                        }
                    >
                        <Text>{item.text}</Text>
                    </View>
                </View>
                <Text style={{ marginLeft: 40 }}>{item.time}</Text>
            </View>
        </View>
    );
}
