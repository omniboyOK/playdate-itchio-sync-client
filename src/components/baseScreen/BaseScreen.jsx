import React from "react";
import {View} from "react-native-windows";

const BaseScreen = ({children, centerContent, styles}) => {
  return (
    <View
      style={[
        {flex: 1},
        centerContent && {justifyContent: "center", alignItems: "center"},
        styles,
      ]}>
      {children}
    </View>
  );
};

export default BaseScreen;
