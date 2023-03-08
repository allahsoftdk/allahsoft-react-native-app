import { FontAwesome } from '@expo/vector-icons';
import { Box, Center, Container, Heading, HStack, Link, Pressable, Row, Stack, Text, View } from 'native-base';
import { FlatList, useColorScheme, ActivityIndicator } from 'react-native';
import React, { useEffect } from "react";
import { Event, PrayerTime } from "../types";
import axios from 'axios';
import axiosInstance from '../utils/axios';

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const [alarms, setAlarms] = React.useState<PrayerTime>({} as PrayerTime);
  const [nextPrayer, setNextPrayer] = React.useState<any>(undefined);
  const [events, setEvents] = React.useState<any>({} as Event);
  const [nextEvent, setNextEvent] = React.useState<any>(undefined);
  const [eventsFailed, setEventsFailed] = React.useState<boolean>(false);
  const [alarmsFailed, setAlarmsFailed] = React.useState<boolean>(false);


  useEffect(() => {
    axiosInstance.get("api/prayer_alarm").then((res) => {
      res.data.today = Object.entries(res.data.today);
      res.data.tomorrow = Object.entries(res.data.tomorrow);
      setAlarms(res.data);
      setNextPrayer(res.data.today.filter((prayer: any) => {
        return prayer[1] > new Date().toLocaleTimeString();
      }));
    }).catch((err) => {
      setAlarmsFailed(true);
      console.log(err);
    });
  }, []);

  useEffect(() => {
    axiosInstance.get("api/event").then((res) => {
      res.data = Object.entries(res.data);
      setEvents(res.data);
      setNextEvent(res.data.filter((event: any) => {
        return event > new Date().toLocaleDateString();
      }));
    }).catch((err) => {
      setEventsFailed(true);
      console.log(err);
    });
  }, []);

  const colorScheme = useColorScheme();

  return (
    <View backgroundColor={colorScheme === "dark" ? "gray.800" : "white"} flex={1}>
      <Center>
        {alarmsFailed ? <Text>Failed to load prayers</Text> :
          !nextPrayer ? <><ActivityIndicator size="large" color="#165d31" /><Text>Loading Prayers</Text></> :
            <Box alignItems="center">
              <Stack p="4" space={3}>
                <Box minW={"300"} rounded="lg" overflow="hidden" borderColor="#165d31" borderWidth="1" _dark={{ borderColor: "coolGray.600", backgroundColor: "gray.700" }} _web={{ shadow: 2, borderWidth: 0 }} _light={{ backgroundColor: "gray.50" }}>
                  <Stack p="4" space={3}>
                    <HStack space={10}>
                      <Heading size="md" ml="-1">
                        <FontAwesome name="bell" size={20} color="#165d31" />
                        <Stack p="1" space={1}></Stack>
                        {nextPrayer[0][0].toString()}
                      </Heading>
                      <Text style={{ textAlign: 'right' }} fontSize={"sm"} fontWeight="400">Copenhagen time zone</Text>
                    </HStack>
                    <HStack space={20}>
                      <Text fontSize={"md"} fontWeight="400">{nextPrayer[0][1].toString()}</Text>
                      <Text fontSize={"sm"} fontWeight="400">MWL calculation</Text>
                    </HStack>
                    <HStack alignItems="center" space={4} justifyContent="space-between">
                      <HStack alignItems="center">
                        <Link _text={{ color: "indigo.500", fontWeight: "medium", fontSize: "sm", onPress: () => navigation.navigate('AlarmTab', { alarms: alarms }) }} href="">
                          <FontAwesome name="eye" size={20} color="#165d31" />
                          <Stack p="1" space={1}></Stack>
                          View All
                        </Link>
                      </HStack>
                    </HStack>
                  </Stack>
                </Box>
              </Stack>
            </Box>
        }

        {eventsFailed ? <Text>Failed to load events</Text> :
          !nextEvent ? <ActivityIndicator size="large" color="#165d31" /> :
            < Box alignItems="center">
              <Stack p="4" space={3}>
                <Box minW={"300"} rounded="lg" overflow="hidden" borderColor="#165d31" borderWidth="1" _dark={{ borderColor: "coolGray.600", backgroundColor: "gray.700" }} _web={{ shadow: 2, borderWidth: 0 }} _light={{ backgroundColor: "gray.50" }}>
                  <Stack p="4" space={3}>
                    <Stack space={2}>
                      <Heading size="md" ml="-1">
                        <FontAwesome name="calendar" size={20} color="#165d31" />
                        <Stack p="1" space={1}></Stack>
                        Upcoming Events
                      </Heading>
                    </Stack>
                    <HStack>
                      <Text fontSize={"md"} fontWeight="600">{nextEvent[0][1].name}</Text>
                      <Text fontSize={"md"} fontWeight="400"> {nextEvent[0][1].eventFrom} - {nextEvent[0][1].eventTo} </Text>
                    </HStack>
                    <HStack alignItems="center" space={4} justifyContent="space-between">
                      <HStack alignItems="center">
                        <Link _text={{ color: "indigo.500", fontWeight: "medium", fontSize: "sm", onPress: () => navigation.navigate('EventTab', { events: events }) }} href="">
                          <FontAwesome name="eye" size={20} color="#165d31" />
                          <Stack p="1" space={1}></Stack>
                          View All
                        </Link>
                      </HStack>
                    </HStack>
                  </Stack>
                </Box>
              </Stack>
            </Box>
        }

        <HStack alignItems="center" space={5} >
          <Box alignItems="center">
            <Pressable onPress={() => navigation.navigate('CompassTab')}  >
              <Box alignItems="center" >
                <FontAwesome name="compass" size={100} color="#165d31" />
                <Text style={{
                  color: colorScheme === 'dark' ? 'white' : 'black',
                }}> Qibla Compass </Text>
              </Box>
            </Pressable>
          </Box>

          <Box alignItems="center">
            <Pressable onPress={() => navigation.navigate('MapTab')}  >
              <Box alignItems="center" >
                <FontAwesome name="map" size={100} color="#165d31" />
                <Text style={{
                  color: colorScheme === 'dark' ? 'white' : 'black',
                }}> Mosque Map </Text>
              </Box>
            </Pressable>
          </Box>
          <Box alignItems="center">
            <Pressable onPress={() => navigation.navigate('HijriTab')}  >
              <Box alignItems="center" >
                <FontAwesome name="hourglass-half" size={100} color="#165d31" />
                <Text style={{
                  color: colorScheme === 'dark' ? 'white' : 'black',
                }}> Hijri Converter </Text>
              </Box>
            </Pressable>
          </Box>
        </HStack>
      </Center >
    </View>
  );
}

export default HomeScreen;