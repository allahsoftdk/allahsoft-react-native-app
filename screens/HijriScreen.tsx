import React from "react";
import { NativeBaseProvider, Text, Box, Center, Container, Heading, HStack, Link, Stack, Switch } from "native-base";
import { Pressable, useColorScheme } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { toHijri, toGregorian } from "hijri-converter";

console.log(toHijri(2023, 2, 20))
toGregorian(1444, 11, 1)

const HijriScreen = ({ navigation }: { navigation: any }) => {
    const colorScheme = useColorScheme();
    return (
        <Center>
            <Container>
                <Box alignItems="center">
                    <Stack p="4" space={3}>
                        <Box minW={"300"} rounded="lg" overflow="hidden" borderColor="#165d31" borderWidth="1" _dark={{ borderColor: "coolGray.600", backgroundColor: "gray.700" }} _web={{ shadow: 2, borderWidth: 0 }} _light={{ backgroundColor: "gray.50" }}>
                            <Stack p="4" space={3}>
                                <Stack space={2}>
                                    <Heading size="md" ml="-1">
                                        <FontAwesome name="clock-o" size={20} color="#165d31" />
                                        <Stack p="1" space={1}></Stack>
                                        Hijri - Gregorian Converter
                                    </Heading>
                                </Stack>

                                <HStack alignItems="center" space={4} justifyContent="space-between">
                                    <HStack alignItems="center">
                                        {/* <Pressable>
                                            {({ isPressed }) => {
                                                return <Box bg={isPressed ? "coolGray.200" : "amber.100"} style={{
                                                    transform: [{
                                                        scale: isPressed ? 0.96 : 1
                                                    }]
                                                }} p="5" rounded="8" shadow={3} borderWidth="1" borderColor="coolGray.300">
                                                </Box>;
                                            }}

                                                    <Text color={"white"} > From Hijri </Text>
                                        </Pressable> */}
                                        {/* <Box padding={"2"} borderRadius={"md"} backgroundColor={"#165d31"} alignItems="center" >
                                        <Text color={"white"} > From Hijri </Text>
                                    </Box> */}

                                    </HStack>
                                </HStack>
                            </Stack>
                        </Box>
                    </Stack>
                </Box>
            </Container >
        </Center >
    )
};
export default HijriScreen;