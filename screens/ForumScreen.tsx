import React from "react";
import { NativeBaseProvider, Box, Center, Link} from "native-base";
import { useColorScheme } from "react-native";
import ChatScreen from "./ChatScreen";
// import MessageScreen from "./MessageScreen";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const ForumScreen = ({ navigation }: { navigation: any }) => {
    const colorScheme = useColorScheme();
    return (
        <Link _text={{
            color: "indigo.500", fontWeight: "medium", fontSize: "sm", onPress: () => navigation.navigate('ChatTab')
        }} href="">Chat shit
        </Link>
    )
};
export default ForumScreen;