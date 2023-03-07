import * as React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { Box, Center, Container, FlatList, Heading, Stack, Text } from "native-base";
import { useWindowDimensions } from "react-native";
import axios from "axios";
import { Event } from "../types";

export default function EventScreen({ route, navigation }: { route: any, navigation: any }) {
    const layout = useWindowDimensions();
    const [events, setEvents] = React.useState<Event[][]>(route.params.events);

    return (
        <Center>
            <FlatList data={events} renderItem={({ item }) => (
                <Container>
                    <Box alignItems="center">
                        <Stack p="3" space={3}>
                            <Box minW={"260"} rounded="lg" overflow="hidden" borderColor="#165d31" borderWidth="1" _dark={{ borderColor: "coolGray.600", backgroundColor: "gray.700" }} _web={{ shadow: 2, borderWidth: 0 }} _light={{ backgroundColor: "gray.50" }}>
                                <Stack p="4" space={3}>
                                    <Stack space={2}>
                                        <Heading size="md" ml="-1">
                                            <FontAwesome name="calendar" size={20} color="#165d31" />
                                            <Stack p="1" space={1}></Stack>
                                            {item[1].name}
                                        </Heading>
                                    </Stack>
                                    <Text fontSize={"md"} fontWeight="400">{item[1].eventFrom} - {item[1].eventTo}</Text>
                                </Stack>
                            </Box>
                        </Stack>
                    </Box>
                </Container>)}
            />
        </Center>
    );
}