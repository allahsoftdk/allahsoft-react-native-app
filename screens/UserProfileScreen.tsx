import React, { useEffect, useState } from "react";
import { NativeBaseProvider, Box, Center, Heading, Text, FormControl, Button, HStack, Input, Link, VStack } from "native-base";
import { Pressable, TextInput, useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native';
import axiosInstance from "../utils/axios";
import { User } from "../types";

const UserProfileScreen = ({ navigation, route }: { navigation: any, route: any }) => {
    const [user, setUser] = useState<User>(route.params.user);
    const [errorMessage, setErrorMessage] = useState<string>();

    const colorScheme = useColorScheme();

    const createChat = async () => {
        axiosInstance.post(`/api/chatRoom/${user.id}`).then((res) => {
            navigation.navigate("MessageTab", {
                id: res.data.id,
                name: res.data.chatRoomParticipants.filter((participant: any) => participant.id === user.id)[0].name
            });
        }).catch((err) => {
            setErrorMessage(err.response.data.message);
            console.log(err);
        });
    };


    return (
        <NativeBaseProvider>
            <Text>{JSON.stringify(user)}</Text>
            <Button onPress={() => createChat()}>Start Chat</Button>
            {!!errorMessage && <Text>{errorMessage}</Text>}
        </NativeBaseProvider>

    )
};
export default UserProfileScreen;