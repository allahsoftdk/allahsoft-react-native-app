import React from "react";
import { NativeBaseProvider, Box, Center, Heading, Text, FormControl, Button, HStack, Input, Link, VStack } from "native-base";
import { Pressable, TextInput, useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useNavigation } from '@react-navigation/native';
import axiosInstance from "../utils/axios";

const LoginScreen = ({ navigation }: { navigation: any }) => {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [loginError, setLoginError] = React.useState("");

    const login = async () => {
        axiosInstance.post("/api/auth/login", { name: username, password: password }).then(async (res) => {
            await AsyncStorage.setItem('user', JSON.stringify(res.data));
            navigation.popToTop();
        }).catch((err) => {
            setLoginError("Invalid username or password");
        });
    };
    const colorScheme = useColorScheme();
    return (
        <NativeBaseProvider>
            <Center w="100%">
                <Box safeArea p="2" py="8" w="90%" maxW="290">
                    <Heading size="lg" fontWeight="600" color= {colorScheme == "dark" ? "white": "dark"} _dark={{ color: "warmGray.800" }}>
                        Login to your account
                    </Heading>
                    {loginError ? <Heading size="sm" fontWeight="600" color="red.500" _dark={{ color: "warmGray.800" }}>
                        {loginError}
                    </Heading> : null}
                    <VStack space={3} mt="5">
                        <FormControl>
                            <FormControl.Label>Username</FormControl.Label>
                            <Input style={{ color: colorScheme == 'dark' ? 'white' : 'dark' }} onChangeText={(text) => setUsername(text)} />
                        </FormControl>
                        <FormControl>
                            <FormControl.Label >Password</FormControl.Label>
                            <Input style={{ color: colorScheme == 'dark' ? 'white' : 'dark' }} secureTextEntry={true} onChangeText={(text) => setPassword(text)} />
                            <Link _text={{ fontSize: "xs", fontWeight: "500", color: "indigo.500", onPress: () => navigation.navigate('ForgotTab') }} alignSelf="flex-end" mt="1">
                                Forgot Password?
                            </Link>
                        </FormControl>
                        <Button mt="2" style={{ backgroundColor: "#165d31" }} onPress={login}>
                            Sign in
                        </Button>
                        <HStack mt="6" justifyContent="center">
                            <Text fontSize="sm" color="coolGray.600" _dark={{
                                color: "warmGray.200"
                            }}>
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
        </NativeBaseProvider>

    )
};
export default LoginScreen;