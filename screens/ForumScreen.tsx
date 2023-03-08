import { View } from "native-base";
import { useColorScheme } from "react-native";
import PostFeedComponent from "../components/PostFeedComponent";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

const Stack = createNativeStackNavigator();

const ForumScreen = ({ navigation }: { navigation: any }) => {
    const colorScheme = useColorScheme();

    return (
        <View backgroundColor={colorScheme === "dark" ? "gray.800" : "white"} flex={1}>
            <PostFeedComponent />
        </View>
    )
};
export default ForumScreen;
