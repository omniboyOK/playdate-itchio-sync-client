import React from "react";
import {Image, TouchableOpacity} from "react-native-windows";

const BaseIconButton = ({
  styles = {},
  icon = require("../../assets/images/question-mark.png"),
  size = 25,
  color = "white",
  pressed = false,
  onPress = () => {},
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: pressed ? "rgba(52, 52, 52, 1)" : "transparent",
      }}>
      <Image
        style={[
          {
            resizeMode: "stretch",
            width: size,
            height: size,
            tintColor: color,
            margin: 5,
          },
          styles,
        ]}
        source={icon}
        width={25}
        height={25}
      />
    </TouchableOpacity>
  );
};

export default BaseIconButton;
