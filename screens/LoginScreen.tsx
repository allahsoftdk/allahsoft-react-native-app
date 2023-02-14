import React from "react";
import { NativeBaseProvider, Box, Center, Heading, Text, FormControl, Button, HStack, Input, Link, VStack } from "native-base";


const LoginScreen = ({ navigation }: { navigation: any }) => {

    return (
        <NativeBaseProvider>
            <Center w="100%">
                <Box safeArea p="2" py="8" w="90%" maxW="290">
                    <Heading size="lg" fontWeight="600" _light={{ color: 'white' }} _dark={{ color: 'black' }}>
                        Qibla Compass
                    </Heading>
                    <VStack space={3} mt="5">
                        <FormControl>
                            <FormControl.Label>Username</FormControl.Label>
                            <Input _light={{ color: 'white' }} _dark={{ color: 'black' }} />
                        </FormControl>
                        <FormControl>
                            <FormControl.Label >Password</FormControl.Label>
                            <Input _light={{ color: 'white' }} _dark={{ color: 'black' }} type="password" />
                            <Link _text={{ fontSize: "xs", fontWeight: "500", color: "indigo.500" }} alignSelf="flex-end" mt="1">
                                Forget Password?
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
                                color: "indigo.500", fontWeight: "medium", fontSize: "sm",
                                onPress: () => navigation.navigate('SignUp')
                            }} href="">
                                Sign Up
                            </Link>
                        </HStack>
                    </VStack>
                </Box>
            </Center>
        </NativeBaseProvider>

    )
};
export default LoginScreen;