import React, {useEffect} from "react";
import {BaseScreen} from "components";
import useItchioStore from "../../../../store/itchio";
import GameList from "screens/Itchio/components/game-list";

const OwnedGames = () => {
  const {setOwnedGames, ownedGames} = useItchioStore();
  useEffect(() => {
    setOwnedGames();
  }, [ownedGames]);

  return (
    <BaseScreen styles={{backgroundColor: "#212223", padding: 25}}>
      <GameList games={ownedGames} loading={false} />
    </BaseScreen>
  );
};

export default OwnedGames;
