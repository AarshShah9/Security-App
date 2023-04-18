import { Text, View } from "react-native";
import RtmpView from "react-native-rtmpview";
import React, { PureComponent } from "react";

export default class Video extends PureComponent {
  render() {
    return (
      <View>
        <RtmpView
          style={{ width: 300, height: 200 }}
          url="rtmp://<server-address>/<stream-name>"
        />
      </View>
    );
  }
}
