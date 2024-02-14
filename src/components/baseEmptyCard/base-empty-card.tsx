import {ACRYLIC_COLOR} from "constants/colors";
import {BASE_CARD_HEIGHT, BASE_CARD_WIDTH, CARD_PADDING} from "constants/theme";
import React from "react";
import {StyleSheet, Text, View} from "react-native-windows";

const BaseEmptyCard: React.FC = () => {
  return (
    <View style={style.container}>
      <Text style={{alignSelf: "center", fontSize: 16, color: "grey"}}>
        Empty
      </Text>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: ACRYLIC_COLOR,
    height: BASE_CARD_HEIGHT,
    width: BASE_CARD_WIDTH,
    borderRadius: 8,
    padding: CARD_PADDING,
    justifyContent: "center",
    opacity: 0.5
  },
});

export default BaseEmptyCard;
