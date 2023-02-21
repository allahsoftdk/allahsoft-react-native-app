import React from "react";
import { NativeBaseProvider, Box, Center, Heading, Text, FormControl, Button, HStack, Input, Link, VStack } from "native-base";
import { useColorScheme } from "react-native";

const LoginScreen = ({ navigation }: { navigation: any }) => {
    const colorScheme = useColorScheme();
    return (
        <NativeBaseProvider>
            <Center w="100%">
                <Box safeArea p="2" py="8" w="90%" maxW="290">
                    <Heading size="lg" fontWeight="600" style={{
                        color: colorScheme === 'dark' ? 'white' : 'black',
                    }} >
                        Sign in to your account
                    </Heading>
                    <VStack space={3} mt="5">
                        <FormControl>
                            <FormControl.Label>Username</FormControl.Label>
                            <Input style={{ color: colorScheme == 'dark' ? 'white' : 'dark' }} />
                        </FormControl>
                        <FormControl>
                            <FormControl.Label >Password</FormControl.Label>
                            <Input style={{ color: colorScheme == 'dark' ? 'white' : 'dark' }} type="password" />
                            <Link _text={{ fontSize: "xs", fontWeight: "500", color: "indigo.500", onPress: () => navigation.navigate('ForgotTab') }} alignSelf="flex-end" mt="1">
                                Forgot Password?
                            </Link>
                        </FormControl>
                        <Button mt="2" style={{ backgroundColor: "#165d31" }}>
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