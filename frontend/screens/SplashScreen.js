import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Image } from "react-native";

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://www.nicepng.com/png/full/201-2019912_stark-industries-logo-png.png",
        }}
        style={{
          width: 250,
          height: 250,
          resizeMode: "contain",
          alignSelf: "center",
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
});
