import * as React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { Box, Center, Container, FlatList, Heading, HStack, Link, Pressable, Row, ScrollView, Stack, Text, View } from "native-base";
import { useColorScheme, useWindowDimensions } from "react-native";
import { TabView, SceneMap } from 'react-native-tab-view';
import axios from "axios";
import { PrayerTimes } from "../types";

export default function AlarmScreen() {
    const layout = useWindowDimensions();
    const [alarms, setAlarms] = React.useState<PrayerTimes>({} as PrayerTimes);

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Today', alarms: alarms },
        { key: 'second', title: 'Tomorrow', alarms: alarms },
    ]);

    React.useEffect(() => {
        axios.get("https://dailyprayer.abdulrcs.repl.co/api/copenhagen").then((res) => {
            res.data.today = Object.entries(res.data.today);
            res.data.tomorrow = Object.entries(res.data.tomorrow);
            setAlarms(res.data);
        }).catch((err) => {
            console.log(err);
        });
    }, [routes]);


    const FirstRoute = () => (
        <Center>
            <FlatList data={alarms.today} renderItem={({ item }) => (
                <Container>
                    <Box alignItems="center">
                        <Stack p="4" space={3}>
                            <Box minW={"250"} rounded="lg" overflow="hidden" borderColor="#165d31" borderWidth="1" _dark={{ borderColor: "coolGray.600", backgroundColor: "gray.700" }} _web={{ shadow: 2, borderWidth: 0 }} _light={{ backgroundColor: "gray.50" }}>
                                <Stack p="4" space={3}>
                                    <Stack space={2}>
                                        <Heading size="md" ml="-1">
                                            <FontAwesome name="bell" size={20} color="#165d31" />
                                            <Stack p="1" space={1}></Stack>
                                            {item[0]}
                                        </Heading>
                                    </Stack>
                                    <Text fontSize={"md"} fontWeight="400">{item[1]}</Text>
                                </Stack>
                            </Box>
                        </Stack>
                    </Box>
                </Container>)}
            />
        </Center>
    );

    const SecondRoute = () => (

        <Center>
            <FlatList data={alarms.tomorrow} renderItem={({ item }) => (
                <Container>
                    <Box alignItems="center">
                        <Stack p="4" space={3}>
                            <Box minW={"250"} rounded="lg" overflow="hidden" borderColor="#165d31" borderWidth="1" _dark={{ borderColor: "coolGray.600", backgroundColor: "gray.700" }} _web={{ shadow: 2, borderWidth: 0 }} _light={{ backgroundColor: "gray.50" }}>
                                <Stack p="4" space={3}>
                                    <Stack space={2}>
                                        <Heading size="md" ml="-1">
                                            <FontAwesome name="bell" size={20} color="#165d31" />
                                            <Stack p="1" space={1}></Stack>
                                            {item[0]}
                                        </Heading>
                                    </Stack>
                                    <Text fontSize={"md"} fontWeight="400">{item[1]}</Text>
                                </Stack>
                            </Box>
                        </Stack>
                    </Box>
                </Container>)}
            />
        </Center>
    );

    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
    });

    return (
        alarms.today !== undefined && alarms.tomorrow !== undefined ?
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
            />
            :
            <Center>
                <Text>Loading...</Text>
            </Center>
    );
}

