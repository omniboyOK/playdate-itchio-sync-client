import React from "react";
import { NavigationContainerRef } from "@react-navigation/native"; // Import from your navigation library

export const navigationRef: React.RefObject<NavigationContainerRef<object>> = React.createRef();

export const useNavigationRef = () => {
  return navigationRef;
};