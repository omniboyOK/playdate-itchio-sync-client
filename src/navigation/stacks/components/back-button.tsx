import {PLAYDATE_YELLOW} from "constants/colors";
import React from "react";
import Icon from "react-native-vector-icons/Octicons";

const BackButton = () => {
  return (
    <Icon
      name="chevron-left"
      color={PLAYDATE_YELLOW}
      size={30}
      style={{width: 15}}
    />
  );
};

export default BackButton;
