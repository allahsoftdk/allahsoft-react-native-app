// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { useColorScheme, Image, View, Text, Dimensions, Platform, Vibration } from 'react-native';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { Magnetometer } from 'expo-sensors';
import * as Location from 'expo-location';
import { Qibla } from 'qibla';


const { height, width } = Dimensions.get('window');

export default function TabTwoScreen() {
  const [subscription, setSubscription] = useState<any>(null);
  const [magnetometer, setMagnetometer] = useState(0);
  const [location, setLocation] = useState<LocationData | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const colorScheme = useColorScheme();

  if (Platform.OS === 'web') {
    return (
      <View backgroundColor={colorScheme === "dark" ? "gray.800" : "white"} flex={1}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: colorScheme === 'dark' ? 'white' : 'black' }}>Sorry, the compass dosen't work on web.</Text>
        </View>
      </View>
    );
  }

  useEffect(() => {
    _toggle();
    return () => {
      _unsubscribe();
    };
  }, []);

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Please enable location to see Qibla direction.');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
      setLocation(location.coords);
    };
    getLocation();

  }, []);
  let qiblaFromTrueNorth = Qibla.degreesFromTrueNorth(latitude, longitude);

  const _toggle = () => {
    if (subscription) {
      _unsubscribe();
    } else {
      _subscribe();
    }
  };

  const _subscribe = () => {
    setSubscription(
      Magnetometer.addListener((data) => {
        setMagnetometer(_angle(data));
      })
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };
  const alpha = 0.5; // value to control the smoothing
  let previousAngle = 0;

  const _angle = (magnetometer: { x: number; y: number; z: number; }) => {
    let angle = 0;
    if (magnetometer) {
      let { x, y, z } = magnetometer;
      if (Math.atan2(y, x) >= 0) {
        angle = Math.atan2(y, x) * (180 / Math.PI);
      } else {
        angle = (Math.atan2(y, x) + 2 * Math.PI) * (180 / Math.PI);
      }
      angle = previousAngle * alpha + angle * (1 - alpha);
      previousAngle = angle;
    }
    return Math.round(angle);
  };
  // Match the device top with pointer 0° degree. (By default 0° starts from the right of the device.)
  const _degree = (magnetometer: number) => {
    return magnetometer - 90 >= 0 ? magnetometer - 90 : magnetometer + 271;
  };
  const compassImageLight = require('../assets/images/compass_light.png');
  const compassImageDark = require('../assets/images/compass_dark.png');
  const compassImageSource = colorScheme === 'dark' ? compassImageDark : compassImageLight;

  const compassNormal = require('../assets/images/compass_pointer.png');
  const compassOnPoint = require('../assets/images/compass_pointer_qibla.png');
  const isOnPoint = Math.abs(_degree(magnetometer) - qiblaFromTrueNorth) < 5;

  useEffect(() => {
    if (isOnPoint) {
      Vibration.vibrate();
    }
  }, [isOnPoint]);

  return (
    <View backgroundColor={colorScheme === "dark" ? "gray.800" : "white"} flex={1}>
      <Grid style={{ backgroundColor: 'White' }}>
        <Row style={{ alignItems: 'center' }} size={.9}>
          <Col style={{ alignItems: 'center' }}>
            <Text
              style={{
                color: colorScheme === 'dark' ? 'white' : 'black',
                fontSize: height / 26,
                fontWeight: 'bold'
              }}>
              {_degree(magnetometer)}°
            </Text>
          </Col>
        </Row>
        <Row style={{ alignItems: 'center' }} size={.1}>
          <Col style={{ alignItems: 'center' }}>
            <View style={{ position: 'absolute', width: width, alignItems: 'center', top: -30 }}>
              <Image source={isOnPoint ? compassOnPoint : compassNormal}
                style={{ height: 60, width: 60, resizeMode: 'contain' }} />
            </View>
          </Col>
        </Row>
        <Row style={{ alignItems: 'center' }} size={2}>
          <Text style={{
            color: colorScheme === 'dark' ? 'white' : 'black',
            fontSize: height / 27,
            width: width,
            position: 'absolute',
            textAlign: 'center'
          }}>
            {errorMsg !== null && errorMsg !== undefined ? 'N/A' : `${qiblaFromTrueNorth}°`}
          </Text>
          <Col style={{ alignItems: 'center' }}>
            <Image
              source={compassImageSource}
              style={{
                height: width - 80,
                justifyContent: 'center',
                alignItems: 'center',
                resizeMode: 'contain',
                transform: [{ rotate: 360 - magnetometer + 'deg' }]
              }} />
          </Col>
        </Row>
        <Row style={{ alignItems: 'center' }} size={1}>
          <Col style={{ alignItems: 'center' }}>
            <Text style={{ color: colorScheme === 'dark' ? 'white' : 'black' }}>{errorMsg ?? `Copyright Allahsoft`}</Text>
          </Col>
        </Row>
      </Grid>
    </View>
  );
}