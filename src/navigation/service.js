import React from "react";
export const navigationRef = React.createRef();

export const useNavigationRef = () => {
  return navigationRef;
};
