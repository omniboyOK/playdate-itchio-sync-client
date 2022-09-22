import React from "react";
import {View} from "react-native";
import ItchioForm from "../itchio/ItchIoForm";
import PlaydateForm from "../playdate/PlaydateForm";

const LeftBar = () => {
  return (
    <View style={{width: "25%"}}>
      <View>
        <ItchioForm />
      </View>
      <View>
        <PlaydateForm />
      </View>
    </View>
  );
};

export default LeftBar;
