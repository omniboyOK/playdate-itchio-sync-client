import React, {useEffect} from "react";
import {BaseScreen} from "components";
import GameList from "screens/Itchio/components/game-list";
import {View} from "react-native-windows";
import useItchioOwnedGamesData from "hooks/useItchioOwnedGamesData";

const OwnedGames = () => {
  const {fetchItchioOwnedGames, games: ownedGames} = useItchioOwnedGamesData();

  useEffect(() => {
    fetchItchioOwnedGames();
  }, [ownedGames]);

  return (
    <BaseScreen>
      <View style={{flex: 1, gap: 15, paddingLeft: 25, paddingTop: 25}}>
        <GameList games={ownedGames} loading={false} />
      </View>
    </BaseScreen>
  );
};

export default OwnedGames;
