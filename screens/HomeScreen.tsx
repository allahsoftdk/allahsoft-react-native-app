import { FontAwesome } from '@expo/vector-icons';
import { Box, Center, Container, Heading, HStack, Link, Pressable, Row, Stack, Text, View } from 'native-base';
import { FlatList, useColorScheme, Image } from 'react-native';
import React, { useEffect } from "react";
import { PrayerTimes } from "../types";
import axios from 'axios';

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const [alarms, setAlarms] = React.useState<PrayerTimes>({} as PrayerTimes);
  const [nextPrayer, setNextPrayer] = React.useState<any>(undefined);

  useEffect(() => {
    axios.get("https://dailyprayer.abdulrcs.repl.co/api/copenhagen").then((res) => {
      res.data.today = Object.entries(res.data.today);
      res.data.tomorrow = Object.entries(res.data.tomorrow);
      setAlarms(res.data);
      setNextPrayer(res.data.today.filter((prayer: any) => {
        return prayer[1] > new Date().toLocaleTimeString();
      }));
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  const colorScheme = useColorScheme();
  return nextPrayer ? (
    <Center>
      <Box alignItems="center">
        <Stack p="4" space={3}>
          <Box minW={"300"} rounded="lg" overflow="hidden" borderColor="#165d31" borderWidth="1" _dark={{ borderColor: "coolGray.600", backgroundColor: "gray.700" }} _web={{ shadow: 2, borderWidth: 0 }} _light={{ backgroundColor: "gray.50" }}>
            <Stack p="4" space={3}>
              <Stack space={2}>
                <Heading size="md" ml="-1">
                  <FontAwesome name="bell" size={20} color="#165d31" />
                  <Stack p="1" space={1}></Stack>
                  {nextPrayer[0][0].toString()}
                </Heading>
              </Stack>
              <Text fontSize={"md"} fontWeight="400">{nextPrayer[0][1].toString()}</Text>
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
      <Box alignItems="center">
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
              <Text fontSize={"md"} fontWeight="400">17/02 - 18/02  Laylat al-Mi'raj</Text>
              <HStack alignItems="center" space={4} justifyContent="space-between">
                <HStack alignItems="center">
                  <Link _text={{ color: "indigo.500", fontWeight: "medium", fontSize: "sm", onPress: () => navigation.navigate('EventTab') }} href="">
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
  ) : <Image source={require('../assets/images/allahsoft-splash.png')} style={{ width: '100%', height: '100%' }} />
}

export default HomeScreen;