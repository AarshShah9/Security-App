import { View, Text, StyleSheet, Image } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";

export default function Signing({ setIsSignedIn }) {
  const loginWithGoogle = () => {
    console.log("Login with Google");
    setIsSignedIn(true);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/SecurityAppIcon.png")}
        style={{
          width: 200,
          height: 200,
          resizeMode: "contain",
          alignSelf: "center",
          marginBottom: 250,
        }}
      />
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          color: "black",
          textAlign: "center",
          paddingBottom: 10,
        }}
      >
        WELCOME
      </Text>
      <Text
        style={{
          paddingBottom: 20,
          fontSize: 12,
        }}
      >
        This is Tony Starks Fully Automated Security System
      </Text>
      <FontAwesome.Button
        name="google"
        backgroundColor="white"
        color="#4285F4"
        onPress={loginWithGoogle}
      >
        Sign in with Google
      </FontAwesome.Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 75,
    backgroundColor: "#f0f0f0",
  },
});
