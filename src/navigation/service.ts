import React from "react";
import {NavigationContainerRef} from "@react-navigation/native";
import {RootStackParamList} from "./types";

export const navigationRef =
  React.createRef<NavigationContainerRef<RootStackParamList>>();

export const useNavigationRef = () => {
  return navigationRef;
};