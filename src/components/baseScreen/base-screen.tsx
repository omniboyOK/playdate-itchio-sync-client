import React from "react";
import {StyleProp, View, ViewStyle} from "react-native-windows";

type BaseScreenProps = {
  children: React.ReactNode;
  styles?: StyleProp<ViewStyle>; // This allows for both single style objects and arrays of styles
};

const BaseScreen: React.FC<BaseScreenProps> = ({children}) => {
  return (
    <View style={{flex: 1, backgroundColor: "#212223", padding: 25}}>
      {children}
    </View>
  );
};

export default BaseScreen;
