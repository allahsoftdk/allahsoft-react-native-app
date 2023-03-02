import React from "react";
import { NativeBaseProvider, Box, Center, Link, Button, View } from "native-base";
import { useColorScheme } from "react-native";
import ChatScreen from "./ChatScreen";
import PostFeedComponent from "../components/PostFeedComponent";

import { globalStyles } from "../styles/globalStyles";

import { NavigationContainer, useFocusEffect } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import checkLoggedIn from "../utils/checkLogIn";

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
