import React from "react";
import { NativeBaseProvider, Box, Center, Link, Button, View } from "native-base";
import { useColorScheme } from "react-native";
import ChatScreen from "./ChatScreen";
import PostFeedComponent from "../components/PostFeedComponent";
// import MessageScreen from "./MessageScreen";

// import the styles
import { globalStyles } from "../styles/globalStyles";

import { NavigationContainer, useFocusEffect } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import checkLoggedIn from "../utils/checkLogIn";

const Stack = createNativeStackNavigator();

const ForumScreen = ({ navigation }: { navigation: any }) => {
    const colorScheme = useColorScheme();
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

    return loggedIn ? (
        <View backgroundColor={colorScheme === "dark" ? "gray.800" : "white"} flex={1}>
            <PostFeedComponent />
        </View>
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
export default ForumScreen;
