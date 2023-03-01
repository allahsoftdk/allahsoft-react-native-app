import React, { useEffect, useState } from "react";
import { NativeBaseProvider, Box, Center, Heading, Text, FormControl, Button, HStack, Input, Link, VStack } from "native-base";
import { Pressable, TextInput, useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native';
import axiosInstance from "../utils/axios";
import { User } from "../types";

const UserProfileScreen = ({ navigation, route }: { navigation: any, route: any }) => {
    const [user, setUser] = useState<User>(route.params.user);

    const colorScheme = useColorScheme();


    return (
        <NativeBaseProvider>
            <Text>{JSON.stringify(user)}</Text>
            <Button onPress={() => navigation.goBack()}>Chat</Button>
        </NativeBaseProvider>

    )
};
export default UserProfileScreen;