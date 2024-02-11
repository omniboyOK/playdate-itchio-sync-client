import React, {useEffect} from "react";
import {BaseScreen} from "components";
import useItchioStore from "../../../../store/itchio";
import GameList from "screens/Itchio/components/game-list";

const ItchioGames = () => {
  const games = useItchioStore(state => state.gamestore);
  const fetchGames = useItchioStore(state => state.setGameStore);
  useEffect(() => {
    fetchGames();
  }, [games]);

  return (
    <BaseScreen
      styles={{backgroundColor: "#212223", padding: 25 }}
      centerContent={undefined}>
      <GameList games={games} />
    </BaseScreen>
  );
};

export default ItchioGames;
