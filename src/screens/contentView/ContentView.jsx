import React, {useCallback, useEffect, useState} from "react";
import {Button} from "react-native";
import {Text, View} from "react-native-windows";
import {getAllPotentialPlaydateGameNames} from "../../helper/itchio";
import GameList from "../gameList/GameList";

const ContentView = () => {
  const [games, setGames] = useState([]);

  const fetchGames = useCallback(getAllPotentialPlaydateGameNames);

  useEffect(() => {
    fetchGames()
      .then(data => {
        setGames(data);
      })
      .catch(console.error);
  }, [fetchGames]);

  return (
    <View style={{width: "75%"}}>
      <Text style={{fontWeight: "600", fontSize: 16}}>Playdate Games</Text>
      <GameList games={games} />
    </View>
  );
};

export default ContentView;
