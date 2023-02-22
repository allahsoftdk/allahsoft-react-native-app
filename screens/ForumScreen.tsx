import React from "react";
import { NativeBaseProvider, Box, Center, Link } from "native-base";
import { useColorScheme } from "react-native";
import ChatScreen from "./ChatScreen";
// import MessageScreen from "./MessageScreen";

import { NavigationContainer, useFocusEffect } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

const ForumScreen = ({ navigation }: { navigation: any }) => {
    const colorScheme = useColorScheme();
    const [loggedIn, setLoggedIn] = React.useState(false);

    const checkLoggedIn = async () => {
        const user = await AsyncStorage.getItem("user");
        if (user) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
    };

    // run checkLoggedIn on navigation
    useFocusEffect(
        React.useCallback(() => {
            let isActive = true;
            const check = async () => {
                await checkLoggedIn();
            };
            if (isActive) {
                check();
            }
            return () => {
                isActive = false;
            };
        }, [])
    );

    return loggedIn ? (
        <Link
            _text={{
                color: "indigo.500",
                fontWeight: "medium",
                fontSize: "sm",
                onPress: () => navigation.navigate("ChatTab"),
            }}
            href=""
        >
            Chat shit
        </Link>
    ) : (
        <Link
            _text={{
                color: "indigo.500",
                fontWeight: "medium",
                fontSize: "sm",
                onPress: () => navigation.navigate("LoginTab"),
            }}
            href=""
        >
            To use this page, please login
        </Link>
    );
};
export default ForumScreen;
