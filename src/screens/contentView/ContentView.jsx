import React, {useEffect} from "react";
import {Text} from "react-native-windows";
import BaseScreen from "../../components/baseScreen/BaseScreen";
import useItchioStore from "../../store/itchio";
import GameList from "../gameList/GameList";

const ContentView = () => {
  const games = useItchioStore(state => state.gamestore);
  const fetchGames = useItchioStore(state => state.setGameStore);
  useEffect(() => {
    fetchGames();
  }, []);

  return (
    <BaseScreen>
      <Text style={{fontWeight: "600", fontSize: 16}}>Playdate Games</Text>
      <GameList games={games} />
    </BaseScreen>
  );
};

export default ContentView;
