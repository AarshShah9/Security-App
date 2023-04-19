import { StyleSheet, Text, View } from "react-native";
import Tabs from "./navigation/Tabs";
import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import SplashScreen from "./screens/SplashScreen";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    console.log("App.js useEffect");
    setTimeout(() => {
      setIsSignedIn(true);
    }, 5000);
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }
  return (
    <NavigationContainer style={styles.container}>
      {!isSignedIn ? <Text>Loading...</Text> : <Tabs />}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
