import React from "react";
import {Text, View} from "react-native-windows";
import GameList from "./screens/itchio/gameList/GameList";
import ItchioForm from "./screens/itchio/ItchIoForm";
import PlaydateForm from "./screens/playdate/PlaydateForm";

const MainScreen = () => {
  return (
    <View style={{height: "100%"}}>
      <Text style={{color: "black"}}>Playdate Itchio Sync</Text>
      <View style={{flexDirection: "row"}}>
        <ItchioForm />
        <PlaydateForm />
      </View>
      <GameList />
    </View>
  );
};

export default MainScreen;
