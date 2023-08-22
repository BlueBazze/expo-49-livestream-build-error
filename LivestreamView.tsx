import {
  LiveStreamMethods,
  LiveStreamView,
} from "@api.video/react-native-livestream";
import React from "react";
import { Button, View } from "react-native";

// Replace with your own stream key and url
const STREAM_KEY = "stream-key";
const STREAM_URL = "rtmp://192.168.2.28:1935";

enum StreamState {
  CONNECTING = "CONNECTING",
  CONNECTED = "CONNECTED",
  DISCONNECTED = "DISCONNECTED",
  FAILED = "FAILED",
}

export function LivestreamView() {
  const liveViewRef = React.useRef() as React.RefObject<LiveStreamMethods>;

  const [streamState, setStreamState] = React.useState<StreamState | undefined>(
    undefined
  );

  function GoLive() {
    liveViewRef.current?.startStreaming(STREAM_KEY, STREAM_URL);
  }

  function StreamStateChanged(state: StreamState) {
    setStreamState(state);
    console.log("Stream state changed: " + state);
  }

  // Get color based on steam state returning rgb
  function GetStreamStateColor() {
    switch (streamState) {
      case StreamState.CONNECTING:
        return "#FFA500";
      case StreamState.CONNECTED:
        return "#00FF00";
      case StreamState.DISCONNECTED:
        return "#FF00FF";
      case StreamState.FAILED:
        return "#FF0000";
      default:
        return "#808080";
    }
  }

  // Get title based on steam state
  function GetStreamStateTitle() {
    switch (streamState) {
      case StreamState.CONNECTING:
        return "Connecting";
      case StreamState.CONNECTED:
        return "Connected";
      case StreamState.DISCONNECTED:
        return "Disconnected";
      case StreamState.FAILED:
        return "Failed";
      default:
        return "Go Live";
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <LiveStreamView
        style={{ flex: 1 }}
        ref={liveViewRef}
        enablePinchedZoom={true}
        onConnectionSuccess={() => StreamStateChanged(StreamState.CONNECTED)}
        onDisconnect={() => StreamStateChanged(StreamState.DISCONNECTED)}
        onConnectionFailed={() => StreamStateChanged(StreamState.FAILED)}
      />
      <Button
        onPress={GoLive}
        title={GetStreamStateTitle()}
        color={GetStreamStateColor()}
      />
    </View>
  );
}
