/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { Link } from "native-base";
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable, StyleSheet, Text, View, Alert } from 'react-native';

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
      <Stack.Screen name="SignUpTab" component={SignupScreen} />
      <Stack.Screen name="LoginTab" component={LoginScreen} />
      <Stack.Screen name="ForgotTab" component={ForgotScreen} />
      <Stack.Screen name="HomeTab" component={HomeScreen} />
      <Stack.Screen name="CompassTab" component={CompassScreen} />
      <Stack.Screen name="ForumTab" component={ForumScreen} />
      <Stack.Screen name="QuranTab" component={QuranScreen} />
      <Stack.Screen name="AlarmTab" component={AlarmScreen} />
      <Stack.Screen name="MapTab" component={MapScreen} />
      <Stack.Screen name="HijriTab" component={HijriScreen} />
      <Stack.Screen name="EventTab" component={EventScreen} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
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

  return (
    <BottomTab.Navigator
      initialRouteName="HomeTab"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>
      <BottomTab.Screen
        name="ForumTab"
        component={ForumScreen}
        options={{
          title: 'Forum',
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
            <Text>
              <Link _text={{
                color: "indigo.500",
                fontWeight: "medium",
                fontSize: "sm",
                onPress: () => navigation.navigate('LoginTab')
              }} href="">
                Sign in
              </Link>
              <Pressable
                onPress={() => navigation.navigate('Modal')}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.5 : 1,
                })}>
                <FontAwesome
                  name="info-circle"
                  size={25}
                  color={Colors[colorScheme].text}
                  style={{ marginRight: 15 }}
                />
              </Pressable>
            </Text>
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