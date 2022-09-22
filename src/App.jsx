import React from "react";
import {View} from "react-native-windows";
import ContentView from "./screens/contentView/ContentView";
import LeftBar from "./screens/leftBar/LeftBar";

const MainScreen = () => {
  return (
    <View style={{height: "100%", backgroundColor: "#212223"}}>
      <View style={{flexDirection: "row"}}>
        <LeftBar />
        <ContentView />
      </View>
    </View>
  );
};

export default MainScreen;
