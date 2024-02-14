import React from "react";
import {BaseScreen} from "components";
import useItchioStore from "../../../../store/itchio";
import GameList from "screens/Itchio/components/game-list";
import {View} from "react-native-windows";

const FavouriteGames = () => {
  const {favouriteGames} = useItchioStore();

  return (
    <BaseScreen>
      <View style={{flex: 1, gap: 15, paddingLeft: 25, paddingTop: 25}}>
        <GameList games={favouriteGames} loading={false} />
      </View>
    </BaseScreen>
  );
};

export default FavouriteGames;
