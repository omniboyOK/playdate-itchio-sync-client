import React from "react";
import {Image, View} from "react-native-windows";

const ActionList = () => {
  return (
    <View style={{flexDirection: "row", justifyContent: "flex-end"}}>
      <Image
        style={{
          resizeMode: "stretch",
          width: 25,
          height: 25,
          tintColor: "white",
          alignSelf: "flex-end",
          margin: 5,
          backgroundColor: "rgba(52, 52, 52, 0.8)",
        }}
        source={require("../../../assets/images/star.png")}
        width={25}
        height={25}
      />
      <Image
        style={{
          resizeMode: "stretch",
          width: 25,
          height: 25,
          tintColor: "white",
          alignSelf: "flex-end",
          margin: 5,
          backgroundColor: "rgba(52, 52, 52, 0.8)",
        }}
        source={require("../../../assets/images/sync.png")}
        width={25}
        height={25}
      />
    </View>
  );
};

export default ActionList;
