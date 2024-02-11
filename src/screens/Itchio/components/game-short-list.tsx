import React from "react";
import GameList from "./game-list";
import {Game} from "types/itchio.types";
import {Text, View} from "react-native-windows";

type GameListProps = {
  games: Game[];
  number: number;
  title: string;
};

const ShortList: React.FC<GameListProps> = ({games, number, title}) => {
  const limitedGames = games.slice(0, number);

  return (
    <View style={{flex: 1, flexDirection: "column", paddingBottom: 15}}>
      <Text
        style={{
          fontSize: 22,
          color: "white",
          paddingBottom: 15,
          fontFamily: "Lato-Bold",
        }}>
        {title}
      </Text>
      <GameList games={limitedGames} />
    </View>
  );
};

export default ShortList;
