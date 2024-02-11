import {ACRYLIC_COLOR} from "constants/colors";
import {BASE_CARD_HEIGHT, BASE_CARD_WIDTH, CARD_PADDING} from "constants/theme";
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
    backgroundColor: ACRYLIC_COLOR,
    height: BASE_CARD_HEIGHT,
    width: BASE_CARD_WIDTH,
    borderRadius: 8,
    padding: CARD_PADDING,
  },
});

export default BaseCard;
