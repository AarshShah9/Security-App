import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import VideoCard from "../components/VideoCard";

export default function VideoScreen() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    // fetch("http://localhost:3000/videos")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setVideos(data);
    //   });
  }, []);

  return (
    <View>
      {videos.map((video) => {
        return <VideoCard key={video.id} video={video} />;
      })}
    </View>
  );
}
