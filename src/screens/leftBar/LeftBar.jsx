import React from "react";
import {View} from "react-native";
import ItchioOAuth from "../itchioOauth/ItchioOauth";
import PlaydateForm from "../playdate/PlaydateForm";

const LeftBar = () => {
  return (
    <View style={{width: "25%"}}>
      <View>
        <PlaydateForm />
      </View>
      <View>
        <ItchioOAuth />
      </View>
    </View>
  );
};

export default LeftBar;
