import React, {useEffect} from "react";
import {BaseScreen} from "components";
import useItchioStore from "../../../../store/itchio";
import GameList from "screens/Itchio/components/game-list";
import {View} from "react-native-windows";

const ItchioGames = () => {
  const games = useItchioStore(state => state.gamestore);
  const fetchGames = useItchioStore(state => state.setGameStore);
  useEffect(() => {
    fetchGames();
  }, [games]);

  return (
    <BaseScreen>
      <View style={{flex: 1, gap: 15, paddingLeft: 25, paddingTop: 25}}>
        <GameList games={games} loading={false} />
      </View>
    </BaseScreen>
  );
};

export default ItchioGames;
