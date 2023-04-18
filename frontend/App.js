import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Video from "./components/Video";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hello!</Text>
      <Video />
      <StatusBar style="auto" />
    </View>
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
