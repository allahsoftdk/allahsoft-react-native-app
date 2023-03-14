import { FontAwesome } from '@expo/vector-icons';
import { Box, Center, Heading, HStack, Link, Pressable, Stack, Text, View } from 'native-base';
import { useColorScheme } from 'react-native';
import React, { useEffect } from "react";
import { Event, PrayerTime } from "../types";
import axiosInstance from '../utils/axios';

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const [alarms, setAlarms] = React.useState<PrayerTime>({} as PrayerTime);
  const [nextPrayer, setNextPrayer] = React.useState<any>(undefined);
  const [events, setEvents] = React.useState<any>({} as Event);
  const [nextEvent, setNextEvent] = React.useState<any>(undefined);
  const [eventsFailed, setEventsFailed] = React.useState<boolean>(false);
  const [alarmsFailed, setAlarmsFailed] = React.useState<boolean>(false);
  const colorScheme = useColorScheme();


  useEffect(() => {
    axiosInstance.get("api/prayer_alarm").then((res) => {
      res.data.today = Object.entries(res.data.today);
      res.data.tomorrow = Object.entries(res.data.tomorrow);
      setAlarms(res.data);
      setNextPrayer(res.data.today.filter((prayer: any) => {
        const time = new Date();
        time.setHours(time.getHours() + 1);
        return prayer[1] > time.toLocaleTimeString();
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
        return new Date(event[1].eventFrom) > new Date();
      }));
    }).catch((err) => {
      setEventsFailed(true);
      console.log(err);
    });
  }, []);

  return (
    <View backgroundColor={colorScheme === "dark" ? "gray.800" : "white"} flex={1}>
      <Center>
        {alarmsFailed ? <Text color={colorScheme === 'dark' ? 'white' : 'black'}>Failed to load prayers</Text> :
          <Box alignItems="center">
            <Stack p="4" space={3}>
              <Box minW={"300"} rounded="lg" overflow="hidden" borderColor="#165d31" borderWidth="1" _dark={{ borderColor: "coolGray.600", backgroundColor: "gray.700" }} _web={{ shadow: 2, borderWidth: 0 }} _light={{ backgroundColor: "gray.50" }}>
                <Stack p="4" space={3}>
                  <HStack space={10}>
                    <Heading size="md" ml="-1">
                      <FontAwesome name="bell" size={20} color="#165d31" />
                      <Stack p="1" space={1}></Stack>
                      {!nextPrayer ? "Loading" : nextPrayer[0][0].toString()}
                    </Heading>
                    <Text style={{ textAlign: 'right' }} fontSize={"sm"} fontWeight="400">Copenhagen time zone</Text>
                  </HStack>
                  <HStack space={20}>
                    <Text fontSize={"md"} fontWeight="400">{!nextPrayer ? "Loading" : nextPrayer[0][1].toString()}</Text>
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

        {!nextEvent ? <Text color={colorScheme === 'dark' ? 'white' : 'black'}>Loading events</Text> :
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
                    {/* This shit does not work for some reason */}
                    {/* <Text fontSize={"md"} fontWeight="600">{!nextEvent ? "test" : nextEvent[0][1].name}</Text>
                    <Text fontSize={"md"} fontWeight="400"> {!nextEvent ? "test" : nextEvent[0][1].eventFrom} - {nextEvent[0][1].eventTo} </Text> */}
                  </HStack>
                  <HStack alignItems="center" space={4} justifyContent="space-between">
                    <HStack alignItems="center">
                      <Link _text={{ color: "indigo.500", fontWeight: "medium", fontSize: "sm", onPress: () => navigation.navigate('EventTab', { events: events }) }} href="">
                        <FontAwesome name="eye" size={20} color="#165d31" />
                        <Stack p="1" space={1}></Stack>
                        View All Events
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