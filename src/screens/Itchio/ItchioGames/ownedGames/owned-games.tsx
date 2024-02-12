import React, {useEffect} from "react";
import {BaseScreen} from "components";
import useItchioStore from "../../../../store/itchio";
import GameList from "screens/Itchio/components/game-list";
import {View} from "react-native-windows";

const OwnedGames = () => {
  const {setOwnedGames, ownedGames} = useItchioStore();
  useEffect(() => {
    setOwnedGames();
  }, [ownedGames]);

  return (
    <BaseScreen>
      <View style={{flex: 1, gap: 15, marginLeft: 25}}>
        <GameList games={ownedGames} loading={false} />
      </View>
    </BaseScreen>
  );
};

export default OwnedGames;
