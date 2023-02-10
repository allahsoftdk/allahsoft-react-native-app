import React, { useState, useEffect } from 'react';
import { Image, View, Text, Dimensions, StyleSheet } from 'react-native';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { Magnetometer } from 'expo-sensors';
import * as Location from 'expo-location';
import {Qibla} from 'qibla';

const { height, width } = Dimensions.get('window');
let qiblaFromTrueNorth = Qibla.degreesFromTrueNorth(55.381178973372236, 10.410297904928738);



export default function TabTwoScreen() {
  const [status, requestPermission] = Location.useForegroundPermissions();
  const [subscription, setSubscription] = useState<any>(null);
  const [magnetometer, setMagnetometer] = useState(0);

  useEffect(() => {
    _toggle();
    return () => {
      _unsubscribe();
    };
  }, []);

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

  const _angle = (magnetometer: { x: number; y: number; z: number; }) => {
    let angle = 0;
    if (magnetometer) {
      let { x, y, z } = magnetometer;
      if (Math.atan2(y, x) >= 0) {
        angle = Math.atan2(y, x) * (180 / Math.PI);
      } else {
        angle = (Math.atan2(y, x) + 2 * Math.PI) * (180 / Math.PI);
      }
    }
    return Math.round(angle);
  };
  // Match the device top with pointer 0° degree. (By default 0° starts from the right of the device.)
  const _degree = (magnetometer: number) => {
    return magnetometer - 90 >= 0 ? magnetometer - 90 : magnetometer + 271;
  };

  return (
    <Grid style={{ backgroundColor: 'black' }}>
      <Row style={{ alignItems: 'center' }} size={.9}>
        <Col style={{ alignItems: 'center' }}>
          <Text
            style={{
              color: '#fff',
              fontSize: height / 26,
              fontWeight: 'bold'
            }}>
            {_degree(magnetometer)}°
          </Text>
        </Col>
      </Row>

      <Row style={{ alignItems: 'center' }} size={.1}>
        <Col style={{ alignItems: 'center' }}>
          <View style={{ position: 'absolute', width: width, alignItems: 'center', top: 0 }}>
            <Image source={require('../assets/images/compass_pointer.png')} style={{
              height: height / 26,
              resizeMode: 'contain'
            }} />
          </View>
        </Col>
      </Row>

      <Row style={{ alignItems: 'center' }} size={2}>
        <Text style={{
          color: '#fff',
          fontSize: height / 27,
          width: width,
          position: 'absolute',
          textAlign: 'center'
        }}>
          {qiblaFromTrueNorth}°
          </Text>

        <Col style={{ alignItems: 'center' }}>

          <Image source={require("../assets/images/compass_bg.png")} style={{
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
          <Text style={{ color: '#fff' }}>Copyright Allahsoft</Text>
        </Col>
      </Row>
    </Grid>
    
  );
}