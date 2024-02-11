import React from "react";
import {StyleSheet, View} from "react-native-windows";

type BaseCardProps = {
  children: React.ReactNode; // Correct type for children
};

const BaseCard: React.FC<BaseCardProps> = ({children}) => {
  return <View style={style.container}>{children}</View>;
};

const style = StyleSheet.create({
  container: {
    backgroundColor: "black",
    height: 180,
    width: 118,
    borderColor: "#FFC833",
    borderWidth: 2,
    borderRadius: 8,
    padding: 5,
  },
});

export default BaseCard;
