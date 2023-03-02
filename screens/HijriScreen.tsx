import React, { useState } from "react";
import { Text, Box, Center, Container, Heading, HStack, Stack, Input } from "native-base";
import { Pressable, useColorScheme } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { toHijri, toGregorian } from "hijri-converter";

const HijriScreen = ({ navigation }: { navigation: any }) => {
    const [textDate, setMyText] = useState("")
    const [textYear, setMyYear] = useState<number>(0)
    const [textMonth, setMyMonth] = useState<number>(0)
    const [textDay, setMyDay] = useState<number>(0)

    const convertDates = (calenderType: string, year: number, month: number, day: number) => {
        if (calenderType === "hijri" && year >= 1350 && year <= 1500) {
            let greg = toGregorian(year, month, day)
            setMyText(greg.gy + "/" + greg.gm + "/" + greg.gd);
        } else if (calenderType === "gregorian" && year >= 1940 && year <= 2070) {
            let hijri = toHijri(year, month, day)
            setMyText(hijri.hy + "/" + hijri.hm + "/" + hijri.hd);
        } else {
            alert("Invalid Date Entered. Hijri Year must be between 1350 and 1500 and Gregorian Year must be between 1940 and 2070");
        }
    }

    const colorScheme = useColorScheme();
    return (
        <Center>
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

                            <Center>
                                <HStack alignItems="center" space={1} >
                                    <Input keyboardType="numeric" size="xs" placeholder="Year" w="33%" onChangeText={(text) => setMyYear(Number(text))} />
                                    <Input keyboardType="numeric" size="xs" placeholder="Month" w="33%" onChangeText={(text) => setMyMonth(Number(text))} />
                                    <Input keyboardType="numeric" size="xs" placeholder="Day" w="33%" onChangeText={(text) => setMyDay(Number(text))} />
                                </HStack>
                            </Center>

                            <Center>
                                <HStack alignItems="center" space={4}>
                                    <Pressable onPress={() => convertDates("gregorian", textYear, textMonth, textDay)}>
                                        <Box alignItems="center" bg={"#165d31"} padding={"2"} rounded={"md"} >
                                            <Text color={"white"}> To Hijri </Text>
                                        </Box>
                                    </Pressable>
                                    <Pressable onPress={() => convertDates("hijri", textYear, textMonth, textDay)} >
                                        <Box alignItems="center" bg={"#165d31"} padding={"2"} rounded={"md"}>
                                            <Text color={"white"}> To Gregorian </Text>
                                        </Box>
                                    </Pressable>
                                </HStack>
                            </Center>
                            <HStack alignItems="center" p="2" space={4}>
                                <Text variant="unstyled" >Result:</Text>
                                <Text variant="unstyled" >{textDate}</Text>
                            </HStack>
                        </Stack>
                    </Box>
                </Stack>
            </Box>
        </Center >
    )
};
export default HijriScreen;