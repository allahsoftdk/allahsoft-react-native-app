/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { Button } from "native-base";
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme, useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, StyleSheet, Alert } from 'react-native';
import { Box, Center, Container, Heading, HStack, Link, Pressable, Row, Text, View } from 'native-base';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AsyncStorage from "@react-native-async-storage/async-storage";

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import LoginScreen from '../screens/LoginScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import HomeScreen from '../screens/HomeScreen';
import ForumScreen from '../screens/ForumScreen';
import QuranScreen from '../screens/QuranScreen';
import EventScreen from '../screens/EventScreen';
import CompassScreen from '../screens/CompassScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import SignupScreen from '../screens/SignupScreen';
import ForgotScreen from "../screens/ForgotScreen";
import AlarmScreen from "../screens/AlarmScreen";
import MapScreen from "../screens/MapScreen";
import HijriScreen from "../screens/HijriScreen";
import ChatScreen from "../screens/ChatScreen";
import MessageScreen from "../screens/MessageScreen";

import { globalStyles } from "../styles/globalStyles";

import axiosInstance from "../utils/axios";
import checkLoggedIn from "../utils/checkLogIn";

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}



/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Screen name="SignUpTab" component={SignupScreen} options={{ title: 'Sign Up' }} />
      <Stack.Screen name="LoginTab" component={LoginScreen} options={{ title: 'Login' }} />
      <Stack.Screen name="ForgotTab" component={ForgotScreen} options={{ title: 'Forgot Password' }} />
      <Stack.Screen name="HomeTab" component={HomeScreen} options={{ title: 'Home' }} />
      <Stack.Screen name="CompassTab" component={CompassScreen} options={{ title: 'Compass' }} />
      <Stack.Screen name="ForumTab" component={ForumTabs} />
      <Stack.Screen name="QuranTab" component={QuranScreen} options={{ title: 'Quran' }} />
      <Stack.Screen name="AlarmTab" component={AlarmScreen} options={{ title: 'Prayer Alarms' }} />
      <Stack.Screen name="MapTab" component={MapScreen} options={{ title: 'Mosque Map' }} />
      <Stack.Screen name="HijriTab" component={HijriScreen} options={{ title: 'Hijri Calendar' }} />
      <Stack.Screen name="EventTab" component={EventScreen} options={{ title: 'Events' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
      <Stack.Screen name="ChatTab" component={ChatScreen} options={{ title: 'Chat' }} />
      <Stack.Screen name="MessageTab" component={MessageScreen} options={{ title: 'Messages' }} />
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  const [loggedIn, setLoggedIn] = React.useState(false);

  const logOut = async () => {
    axiosInstance.post("/api/auth/logout").then(async (res) => {
      await AsyncStorage.removeItem('user');
      await checkLoggedIn(setLoggedIn);
    }).catch((err) => {
      console.log(err);
    });
  };

  // run checkLoggedIn on navigation
  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;
      const check = async () => {
        await checkLoggedIn(setLoggedIn);
      };
      if (isActive) {
        check();
      }
      return () => {
        isActive = false;
      };
    }, [])
  );

  return (
    <BottomTab.Navigator
      initialRouteName="HomeTab"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>
      <BottomTab.Screen
        name="ForumTabs"
        component={ForumTabs}
        options={{
          title: 'Allahsoft Forum',
          tabBarIcon: ({ color }) => <TabBarIcon name="comments" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={({ navigation }: RootTabScreenProps<'HomeTab'>) => ({
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome name="home" size={35} color={color} />,
          headerRight: () => (
            <View style={{ flexDirection: 'row' }}>
              <Button
                style={globalStyles.greenColor}
                _text={{
                  color: "white",
                  fontWeight: "medium",
                  fontSize: "sm",
                  onPress: () => loggedIn ? logOut() : navigation.navigate('LoginTab')
                }}>
                {loggedIn ? 'Logout' : 'Login'}
              </Button>
              {loggedIn ? <Pressable
                onPress={() => navigation.navigate('Modal')}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.5 : 1,
                })}>
                <FontAwesome
                  name="gear"
                  size={25}
                  color={Colors[colorScheme].text}
                  style={{ marginRight: 10, marginLeft: 15, padding: 5 }}
                />
              </Pressable> : <View style={{ marginRight: 20, marginLeft: 25, padding: 5 }}></View>}
            </View>
          ),
        })}
      />
      <BottomTab.Screen
        name="QuranTab"
        component={QuranScreen}
        options={{
          title: 'Quran',
          tabBarIcon: ({ color }) => <TabBarIcon name="book" color={color} />,
        }}
      />

    </BottomTab.Navigator>

  );
}

const tab = createMaterialTopTabNavigator();

function ForumTabs() {
  return (
    <tab.Navigator>
      <tab.Screen name="ForumTab" component={ForumScreen} options={{ title: 'Feed' }} />
      <tab.Screen name="ChatTab" component={ChatScreen} options={{ title: 'Chat' }} />
    </tab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 5,
    backgroundColor: '#165d31',
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 12,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});