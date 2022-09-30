import React from "react";
import {View} from "react-native-windows";

const BaseScreen = ({children, centerContent}) => {
  return (
    <View
      style={[
        {flex: 1},
        centerContent && {justifyContent: "center", alignItems: "center"},
      ]}>
      {children}
    </View>
  );
};

export default BaseScreen;
