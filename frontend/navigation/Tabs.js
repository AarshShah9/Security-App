import { View, Text, StyleSheet } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import VideoScreen from "../screens/VideoScreen";
import LiveStreamScreen from "../screens/LiveStreamScreen";
import SettingsScreen from "../screens/SettingsScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faHome,
  faVideo,
  faBroadcastTower,
  faCog,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";

const Tab = createBottomTabNavigator();

export default function Tabs({ setDarkMode, darkMode }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = faHome;
          } else if (route.name === "Videos") {
            iconName = faVideo;
          } else if (route.name === "LiveStream") {
            iconName = faBroadcastTower;
          } else if (route.name === "Settings") {
            iconName = faCog;
          }

          return <FontAwesomeIcon icon={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "red",
        tabBarInactiveTintColor: "gray",
        tabBarLabelStyle: {
          fontSize: 14,
        },
        tabBarStyle: {
          backgroundColor: "#f2f4f5",
          display: "flex",
        },
        tabBarLabelStyle: {
          display: "none",
        },
        // headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Videos" component={VideoScreen} />
      <Tab.Screen name="LiveStream" component={LiveStreamScreen} />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        initialParams={{ setDarkMode, darkMode }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f2f4f5",
  },
});
