import { FontAwesome } from '@expo/vector-icons';
import React from "react";
import { View, Pressable, Alert, StyleSheet, Text } from "react-native";
import { RootTabScreenProps } from "../types";

export function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {
  return (
    <View
      style={[styles.container, { flexDirection: 'column', },]}>

      <View style={[styles.box, { flex: 1.5 }]}>
        <View style={styles.boxHeader} >
          <Text style={{ marginBottom: 8, marginTop: 8 }} >
            <FontAwesome name="bell" size={30} color="black" />
            <Text style={styles.titleText} > Upcoming Alarms </Text>
          </Text>
        </View>
        <Text style={{ margin: 15 }}>
          <Text style={styles.boxText}  > 12:24 Dhurhr </Text>
        </Text>
        <Text style={{ alignSelf: 'flex-end', marginRight: 15 }}>
          <FontAwesome name="eye" size={24} color="black" />
          <Text style={{ fontSize: 15 }} > View All </Text>
        </Text>
      </View>
      <View style={[styles.box, { flex: 1.5 }]}>
        <View style={styles.boxHeader} >
          <Text style={{ marginBottom: 8, marginTop: 8 }} >
            <FontAwesome name="calendar" size={30} color="black" />
            <Text style={styles.titleText} > Upcoming Events </Text>
          </Text>
        </View>
        <Text style={{ margin: 15 }}>
          <Text style={styles.boxText}  > 17/02 - 18/02  Laylat al-Mi'raj </Text>
        </Text>
        <Text style={{ alignSelf: 'flex-end', marginRight: 15 }}>
          <FontAwesome name="eye" size={24} color="black" />
          <Text style={{ fontSize: 15 }} > View All </Text>
        </Text>
      </View>
      <View style={{ flex: 2 }}>
        <Text>
          <View style={styles.icon}>
            <FontAwesome name="compass" size={90} color="#165d31" />
            <Text style={styles.iconText} > Qibla Compass </Text>
          </View>
          <View style={styles.icon}>
            <FontAwesome name="map" size={80} color="#165d31" />
            <Text style={styles.iconText} > Mosque Map </Text>
          </View>
          <View style={styles.icon}>
            <FontAwesome name="hourglass-half" size={80} color="#165d31" />
            <Text style={styles.iconText} > Hijri converter </Text>
          </View>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  icon: {
    padding: 10,
    alignSelf: 'flex-start',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconText: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 5,
    backgroundColor: '#165d31',
    alignSelf: 'flex-start',
  },
  titleText: {
    fontSize: 30,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  boxText: {
    fontSize: 20,
  },
  box: {
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#165d31',
  },
  boxHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
});

export default HomeScreen;