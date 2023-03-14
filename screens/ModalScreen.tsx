import React from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import { Text, View } from 'native-base';

export default function ModalScreen() {
  const colorScheme = useColorScheme();

  return (
    <View backgroundColor={colorScheme === "dark" ? "gray.800" : "white"} style={styles.container}>
      <Text style={{ color: colorScheme === 'dark' ? 'white' : 'black' }} >This screen has no functionality yet</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
