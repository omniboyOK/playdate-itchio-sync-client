import React, {useEffect} from "react";
import BaseScreen from "../../../../components/baseScreen/BaseScreen";
import useItchioStore from "../../../../store/itchio";
import GameList from "../../../gameList/GameList";

const ItchioGames = () => {
  const games = useItchioStore(state => state.gamestore);
  const fetchGames = useItchioStore(state => state.setGameStore);
  useEffect(() => {
    fetchGames();
  }, []);

  return (
    <BaseScreen styles={{padding: 15, backgroundColor: "grey"}}>
      <GameList games={games} id={"_storeGames"} key="storeGames" />
    </BaseScreen>
  );
};

export default ItchioGames;
