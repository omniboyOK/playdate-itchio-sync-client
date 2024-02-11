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
    backgroundColor: "#212223",
    height: 150,
    width: 118,
    borderColor: "grey",
    borderWidth: 2,
    borderRadius: 8,
    padding: 5,
    borderStyle: "dotted",
    justifyContent: "center",
  },
});

export default BaseEmptyCard;
