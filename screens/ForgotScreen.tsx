import React from "react";
import { NativeBaseProvider, Box, Center, Heading, Text, FormControl, Button, HStack, Input, Link, VStack } from "native-base";
import { useColorScheme } from "react-native";

const ForgotScreen = ({ navigation }: { navigation: any }) => {
    const colorScheme = useColorScheme();
    return (
        <NativeBaseProvider>
            <Center w="100%">
                <Box safeArea p="2" py="8" w="90%" maxW="290">
                    <Heading size="lg" fontWeight="600" style={{ color: colorScheme == 'dark' ? 'white' : 'dark' }}>
                        Qibla Compass
                    </Heading>
                    <Heading mt="1" _dark={{
                        color: "warmGray.200"
                    }} style={{ color: colorScheme == 'dark' ? 'grey' : 'dark' }} fontWeight="medium" size="xs">
                        Reset Password
                    </Heading>
                    <VStack space={3} mt="5">
                        <FormControl>
                            <FormControl.Label>Email</FormControl.Label>
                            <Input style={{ color: colorScheme == 'dark' ? 'white' : 'dark' }} />
                        </FormControl>
                        <Button mt="2" style={{ backgroundColor: "#165d31" }}>Send</Button>
                    </VStack>
                </Box>
            </Center>
        </NativeBaseProvider>

    )
};
export default ForgotScreen;