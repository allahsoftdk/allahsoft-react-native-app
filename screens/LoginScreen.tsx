import React, { useEffect } from "react";
import { NativeBaseProvider, Box, Center, Heading, Text, FormControl, Button, HStack, Input, Link, VStack, View } from "native-base";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import axiosInstance from "../utils/axios";

const LoginScreen = ({ navigation, route }: { navigation: any, route: any }) => {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [displayMessage, setDisplayMessage] = React.useState("");
    const [messageColor, setMessageColor] = React.useState("red.500");
    const { signUpMessage } = route.params || {};

    const login = async () => {
        axiosInstance.post("/api/auth/login", { name: username, password: password }).then(async (res) => {
            await AsyncStorage.setItem('user', JSON.stringify(res.data));
            navigation.popToTop();
        }).catch((err) => {
            setMessageColor("red.500");
            setDisplayMessage("Invalid username or password");
        });
    };

    useEffect(() => {
        if (signUpMessage) {
            setUsername("");
            setPassword("");
            setDisplayMessage(signUpMessage);
            setMessageColor("green.500");
        }
    }, [signUpMessage]);

    const colorScheme = useColorScheme();


    return (
        <NativeBaseProvider>
            <View backgroundColor={colorScheme === "dark" ? "gray.800" : "white"} flex={1}>
                <Center w="100%">
                    <Box safeArea p="2" py="8" w="90%" maxW="290">
                        <Heading size="lg" fontWeight="600" color={colorScheme == "dark" ? "white" : "dark"} _dark={{ color: "warmGray.800" }}>
                            Sign in to your account
                        </Heading>
                        {displayMessage ? <Heading size="sm" fontWeight="600" color={messageColor} _dark={{ color: "warmGray.800" }}>
                            {displayMessage}
                        </Heading> : null}
                        <VStack space={3} mt="5">
                            <FormControl>
                                <FormControl.Label _text={{ color: colorScheme == 'dark' ? 'white' : 'dark' }}>Username</FormControl.Label>
                                <Input style={{ color: colorScheme == 'dark' ? 'white' : 'dark' }} onChangeText={(text) => setUsername(text)} />
                            </FormControl>
                            <FormControl>
                                <FormControl.Label _text={{ color: colorScheme == 'dark' ? 'white' : 'dark' }}>Password</FormControl.Label>
                                <Input style={{ color: colorScheme == 'dark' ? 'white' : 'dark' }} secureTextEntry={true} onChangeText={(text) => setPassword(text)} />
                                <Link _text={{ fontSize: "xs", fontWeight: "500", color: "indigo.500", onPress: () => navigation.navigate('ForgotTab') }} alignSelf="flex-end" mt="1">
                                    Forgot Password?
                                </Link>
                            </FormControl>
                            <Button mt="2" style={{ backgroundColor: "#165d31" }} onPress={login}>
                                Sign in
                            </Button>
                            <HStack mt="6" justifyContent="center">
                                <Text fontSize="sm" color={colorScheme == "dark" ? "warmGray.200" : "warmGray.500"} fontWeight={400}>
                                    I'm a new user.{" "}
                                </Text>
                                <Link _text={{
                                    color: "indigo.500", fontWeight: "medium", fontSize: "sm", onPress: () => navigation.navigate('SignUpTab')
                                }} href="">Sign Up
                                </Link>
                            </HStack>
                        </VStack>
                    </Box>
                </Center>
            </View>
        </NativeBaseProvider>

    )
};
export default LoginScreen;