import { Center, Button, Box, Heading, VStack, FormControl, Input } from "native-base";

import React from "react";
import { useColorScheme } from "react-native";
import axiosInstance from "../utils/axios";

const SignupScreen = ({ navigation }: { navigation: any }) => {
    const colorScheme = useColorScheme();
    const [email, setEmail] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [error, setError] = React.useState("");

    const signup = async () => {
        axiosInstance.post("/api/auth/register", { email: email, name: username, password: password, confirmPassword: confirmPassword }).then(async (res) => {
            console.log(res.data);
            navigation.navigate('LoginTab', { signUpMessage: "Account created successfully. Please login to continue" });
        }).catch((err) => {
            setError(err.response.data.msg);
        });
    };

    return <Center w="100%">
        <Box safeArea p="2" w="90%" maxW="290" py="8">
            <Heading size="lg" fontWeight="600" style={{ color: colorScheme == 'dark' ? 'white' : 'black' }}>Sign up</Heading>
            {error ? <Heading size="sm" fontWeight="600" color="red.500" _dark={{ color: "warmGray.800" }}>
                {error}
            </Heading> : null}
            <VStack space={3} mt="5">
                <FormControl>
                    <FormControl.Label>Email</FormControl.Label>
                    <Input style={{ color: colorScheme == 'dark' ? 'white' : 'black' }} onChangeText={(text) => setEmail(text)} />
                </FormControl>
                <FormControl>
                    <FormControl.Label>Username</FormControl.Label>
                    <Input style={{ color: colorScheme == 'dark' ? 'white' : 'black' }} onChangeText={(text) => setUsername(text)} />
                </FormControl>
                <FormControl>
                    <FormControl.Label>Password</FormControl.Label>
                    <Input style={{ color: colorScheme == 'dark' ? 'white' : 'black' }} secureTextEntry={true} onChangeText={(text) => setPassword(text)} />
                </FormControl>
                <FormControl>
                    <FormControl.Label>Confirm Password</FormControl.Label>
                    <Input style={{ color: colorScheme == 'dark' ? 'white' : 'black' }} secureTextEntry={true} onChangeText={(text) => setConfirmPassword(text)} />
                </FormControl>
                <Button mt="2" style={{ backgroundColor: "#165d31" }} onPress={signup}> Sign Up </Button>
            </VStack>
        </Box>
    </Center>;
};

export default SignupScreen;