import { View, Text } from "react-native";
import React from "react";
import { Image } from "react-native";

export default function SplashScreen() {
  return (
    <View>
      <Image
        source={{
          uri: "https://www.nicepng.com/png/full/201-2019912_stark-industries-logo-png.png",
        }}
        style={{
          width: 200,
          height: 200,
          resizeMode: "contain",
          alignSelf: "center",
        }}
      />
    </View>
  );
}
