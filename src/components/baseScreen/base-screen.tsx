import {BACKGROUND_COLOR} from "constants/colors";
import React from "react";
import {StyleProp, StyleSheet, View, ViewStyle} from "react-native-windows";

type BaseScreenProps = {
  children: React.ReactNode;
  styles?: StyleProp<ViewStyle>; // This allows for both single style objects and arrays of styles
};

const BaseScreen: React.FC<BaseScreenProps> = ({children}) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
});

export default BaseScreen;
