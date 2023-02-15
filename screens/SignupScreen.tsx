import { Center, Button, Box, Heading, VStack, FormControl, Input } from "native-base";

import React from "react";
import { useColorScheme } from "react-native";

const SignupScreen = () => {
    const colorScheme = useColorScheme();

    return <Center w="100%">
        <Box safeArea p="2" w="90%" maxW="290" py="8">
            <Heading size="lg" fontWeight="600" style={{ color: colorScheme == 'dark' ? 'white' : 'black'}}>Qibla Compass</Heading>
            <VStack space={3} mt="5">
                <FormControl>
                    <FormControl.Label>Email</FormControl.Label>
                    <Input style={{ color: colorScheme == 'dark' ? 'white' : 'dark'}} />
                </FormControl>
                <FormControl>
                    <FormControl.Label>Username</FormControl.Label>
                    <Input style={{ color: colorScheme == 'dark' ? 'white' : 'dark'}} />
                </FormControl>
                <FormControl>
                    <FormControl.Label>Password</FormControl.Label>
                    <Input type="password" style={{ color: colorScheme == 'dark' ? 'white' : 'black'}} />
                </FormControl>
                <FormControl>
                    <FormControl.Label>Confirm Password</FormControl.Label>
                    <Input type="password" style={{ color: colorScheme == 'dark' ? 'white' : 'black'}} />
                </FormControl>
                <Button mt="2" style={{ backgroundColor: "#165d31" }}>Sign up</Button>
            </VStack>
        </Box>
    </Center>;
};

export default SignupScreen;