import React from "react";
import {Text, View} from "react-native-windows";
import GameList from "../itchio/gameList/GameList";

const ContentView = () => {
  return (
    <View style={{width: "75%"}}>
      <Text style={{fontWeight: "600", fontSize: 16}}>Playdate Games</Text>
      <GameList />
    </View>
  );
};

export default ContentView;
