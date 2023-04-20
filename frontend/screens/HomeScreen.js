import { View, Text, StyleSheet, Switch } from "react-native";
import React, { useState } from "react";

export default function HomeScreen() {
  const [isArmed, setIsArmed] = useState(false);

  const handleSwitch = () => {
    setIsArmed(!isArmed);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Security System App</Text>
      <Text style={styles.subtitle}>Home Screen</Text>
      <View style={styles.switchContainer}>
        <View style={styles.switch}>
          <Text style={styles.switchLabel}>
            {isArmed ? "System is armed" : "System is disarmed"}
          </Text>
          <Switch value={isArmed} onValueChange={handleSwitch} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  switchContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  switch: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eaeaea",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  switchLabel: {
    marginRight: 10,
    fontSize: 16,
  },
});
