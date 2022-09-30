/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from "react";
import {SafeAreaView, StatusBar, useColorScheme} from "react-native";
import MainScreen from "./src/App";

const App = () => {
  const isDarkMode = useColorScheme() === "dark";

  const backgroundStyle = {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#312f28",
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <MainScreen />
    </SafeAreaView>
  );
};

export default App;
