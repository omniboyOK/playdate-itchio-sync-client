import {PLAYDATE_YELLOW} from "constants/colors";
import React from "react";
import Icon from "react-native-vector-icons/Octicons";

const BackButton = () => {
  return (
    <Icon
      name="chevron-left"
      color={PLAYDATE_YELLOW}
      size={24}
      style={{width: 24, marginRight: -24}}
    />
  );
};

export default BackButton;
