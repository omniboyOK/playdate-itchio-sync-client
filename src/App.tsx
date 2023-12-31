import React from "react";
import {enableScreens} from "react-native-screens";
import RootNavigator from "./navigation/root-navigator";

enableScreens();

const MainScreen = (): React.ReactElement => {
  return <RootNavigator />;
};

export default MainScreen;
