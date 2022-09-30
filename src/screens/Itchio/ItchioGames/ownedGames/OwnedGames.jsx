import React, {useEffect} from "react";
import BaseScreen from "../../../../components/baseScreen/BaseScreen";
import useItchioStore from "../../../../store/itchio";
import GameList from "../../../gameList/GameList";

const OwnedGames = () => {
  const games = useItchioStore(state => state.ownedGames);
  const fetchMyGames = useItchioStore(state => state.setOwnedGames);
  useEffect(() => {
    fetchMyGames();
  }, []);

  return (
    <BaseScreen styles={{padding: 15, backgroundColor: "grey"}}>
      <GameList games={games} id={"_storeGames"} key="ownedGames" />
    </BaseScreen>
  );
};

export default OwnedGames;
