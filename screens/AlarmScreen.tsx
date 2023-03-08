import * as React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { Box, Center, Container, FlatList, Heading, Stack, Text, VStack, View } from "native-base";
import { useColorScheme, useWindowDimensions } from "react-native";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { PrayerTime } from "../types";
import { color } from 'native-base/lib/typescript/theme/styled-system';

export default function AlarmScreen({ route, navigation }: { route: any, navigation: any }) {
    const layout = useWindowDimensions();
    const [alarms, setAlarms] = React.useState<PrayerTime>(route.params.alarms);

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Today', alarms: alarms },
        { key: 'second', title: 'Tomorrow', alarms: alarms },
    ]);

    const colorScheme = useColorScheme();
    const FirstRoute = () => (
        <View backgroundColor={colorScheme === "dark" ? "gray.800" : "white"} flex={1}>
            <Center pb={5}>
                <VStack alignItems={"center"}>
                    <Text fontSize={"md"} fontWeight="400" style={{ color: colorScheme === 'dark' ? 'white' : 'black' }}>Copenhagen time zone</Text>
                    <Text fontSize={"md"} fontWeight="400" style={{ color: colorScheme === 'dark' ? 'white' : 'black' }}>MWL Calculation</Text>
                </VStack>
                <FlatList data={alarms.today} renderItem={({ item }) => (
                    <Container>
                        <Box alignItems="center">
                            <Stack p="3" space={3}>
                                <Box minW={"230"} rounded="lg" overflow="hidden" borderColor="#165d31" borderWidth="1" _dark={{ borderColor: "coolGray.600", backgroundColor: "gray.700" }} _web={{ shadow: 2, borderWidth: 0 }} _light={{ backgroundColor: "gray.50" }}>
                                    <Stack p="4" space={3}>
                                        <Stack space={2}>
                                            <Heading size="md" ml="-1">
                                                <FontAwesome name="bell" size={20} color="#165d31" />
                                                <Stack p="1" space={1}></Stack>
                                                Prayer: {item[0]}
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
        </View>
    );

    const SecondRoute = () => (
        <View backgroundColor={colorScheme === "dark" ? "gray.800" : "white"} flex={1}>
            <Center pb={5}>
                <VStack alignItems={"center"}>
                    <Text fontSize={"md"} fontWeight="400" style={{ color: colorScheme === 'dark' ? 'white' : 'black' }}>Copenhagen time zone</Text>
                    <Text fontSize={"md"} fontWeight="400" style={{ color: colorScheme === 'dark' ? 'white' : 'black' }}>MWL Calculation</Text>
                </VStack>
                <FlatList data={alarms.tomorrow} renderItem={({ item }) => (
                    <Container>
                        <Box alignItems="center">
                            <Stack p="3" space={3}>
                                <Box minW={"230"} rounded="lg" overflow="hidden" borderColor="#165d31" borderWidth="1" _dark={{ borderColor: "coolGray.600", backgroundColor: "gray.700" }} _web={{ shadow: 2, borderWidth: 0 }} _light={{ backgroundColor: "gray.50" }}>
                                    <Stack p="4" space={3}>
                                        <Stack space={2}>
                                            <Heading size="md" ml="-1">
                                                <FontAwesome name="bell" size={20} color="#165d31" />
                                                <Stack p="1" space={1}></Stack>
                                                Prayer: {item[0]}
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
        </View>
    );

    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
    });

    return (
        alarms.today !== undefined && alarms.tomorrow !== undefined ?
            <TabView
                // style={{ backgroundColor: '#fff' }}
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
                renderTabBar={props => <TabBar {...props} style={{ backgroundColor: '#165d31' }} />}
            />
            :
            <Center>
                <Text>Loading...</Text>
            </Center>
    );
}

