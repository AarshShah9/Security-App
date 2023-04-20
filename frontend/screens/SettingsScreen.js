import { View, Text, Switch } from "react-native";
import React, { useState } from "react";
import { useRoute } from "@react-navigation/native";

export default function SettingsScreen() {
  // const route = useRoute();
  // const { setDarkMode, darkMode } = route.params;
  const [darkMode, setDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const toggleDarkMode = () => {
    console.log("toggleDarkMode");
    setDarkMode(!darkMode);
    // code to update the app's theme goes here
  };

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
    // code to update the app's notification settings goes here
  };

  return (
    <View style={{ padding: 16 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <Text style={{ fontSize: 16 }}>Dark mode</Text>
        <Switch value={darkMode} onValueChange={toggleDarkMode} />
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <Text style={{ fontSize: 16 }}>Notifications</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={toggleNotifications}
        />
      </View>

      <View style={{ marginBottom: 16 }}>
        <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 8 }}>
          About
        </Text>
        <Text style={{ fontSize: 14 }}>
          This is a comprehensive security application created by Aarsh Shah.
        </Text>
      </View>

      {/* add additional settings sections here as needed */}
    </View>
  );
}
