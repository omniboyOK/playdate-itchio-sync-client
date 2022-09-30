import React from "react";
import {WebView} from "react-native-windows";

const onNavigationStateChange = navigationState => {
  const url = navigationState.url;
  console.log(url);
  // parseURLParams is a pseudo function.
  // Make sure to write your own function or install a package
  const params = {};

  if (params.token) {
    // Save token for native requests & move to the next screen
    console.log(params.token);
  }
};

const PlaydateWeb = () => {
  return (
    <WebView
      source={{uri: "https://play.date/signin/"}}
      onNavigationStateChange={onNavigationStateChange}
    />
  );
};

export default PlaydateWeb;
